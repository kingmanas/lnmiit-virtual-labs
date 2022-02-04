const config = require("../config/auth.config");
const crypto = require("crypto");
const crypto_js = require("crypto-js");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redis } = require("../utils/connection");
const { User } = require("../models/models");
const validator = require("validator");
const { OAuth2Client } = require("google-auth-library");

function generateAccessToken(req, res, verifyUser, callback_) {
  const username = req.username;
  if (!username) callback_("NO_USERNAME", null);

  verifyUser = verifyUser || true;

  User.findOne({ username: req.username }, (err, docs) => {
    if (err && verifyUser == true) {
      console.log(username + " USER_NOT_FOUND");
      return callback_(err, null);
    } else {
      try {
        const token = jwt.sign(
          { username: docs.username, role: docs.role },
          config.jwt_signing_key,
          {
            algorithm: "HS256",
            expiresIn: config.jwt_expiry_time,
          }
        );
        callback_(null, token);
      } catch (err) {
        callback_(err, null);
      }
    }
  });
}

function generateRefreshToken(req, res, callback_) {
  const refresh_token = crypto.randomBytes(64).toString("hex");
  try {
    redis.set(
      refresh_token,
      req.username,
      "EX",
      config.refresh_token_expiry_time,
      callback_(null, refresh_token)
    );
  } catch (err) {
    callback_(err, null);
  }
}

function tokenUtility(req, res, verifyUser) {
  generateAccessToken(req, res, verifyUser, (err, access_token) => {
    if (err) {
      console.log(err);
      res.status(403).send("ACCESS_TOKEN_FAILED");
      return;
    }
    res.cookie("x-access-token", access_token, {
      httpOnly: true,
      secure: true,
    });

    generateRefreshToken(req, res, (err, refresh_token) => {
      if (err) {
        console.log(err);
        res.status(403).send("REFRESH_TOKEN_FAILED");
        return;
      }
      res.cookie("x-refresh-token", refresh_token, {
        httpOnly: true,
        secure: true,
      });

      console.log(`${req.username} logged in.`);
      return res.json({ username: req.username, role: req.role });
    });
  });
}

module.exports = {
  verifyEmail: (req, res) => {
    // change the email_verified value when the user clicks the
    // right link sent to him/her on email
    const verificationValue = req.params.verify;
    const username = redis.get(verificationValue);
    if (!username) {
      res.send(401, "INCORRECT_LINK");
    }
    try {
      User.updateOne(
        { username: username },
        { email_verified: true },
        (err, result) => {
          if (err) throw err;
          else console.log(result);
        }
      );
    } catch (err) {
      console.log(err);
      return res.send(403, "EMAIL_VERIFICATION_FAILED");
    }
    res.send(200, "EMAIL_VERIFIED");
  },

  register: async (req, res) => {
    // check if user is already registered
    try {
      const username = req.body.username;
      const passwd = hashSync(req.body.passwd, 10);
      const email = req.body.email;
      const name = `${req.body.first_name}${req.body.last_name}`;

      if (!validator.isEmail(email)) {
        return res.send(403, "INVALID_EMAIL");
      }

      if (!validator.isAlphanumeric(name) || name.length < 1) {
        return res.send(403, "INVALID_NAME");
      }

      // find if the username is already present
      try {
        const userQuery = await User.find({ username: username });
        if (userQuery != null && userQuery.email_verified == false) {
          return res.send(403, "USERNAME_UNAVAILABLE");
        }
      } catch (err) {
        console.log(err);
        return res.send(403, "SERVER_FAULT_1");
      }

      try {
        await new User({
          username: username,
          hashed_password: passwd,
          email: email,
        }).save();
      } catch (err) {
        console.log(err);
        return res.send(403, "SERVER_FAULT_2");
      }

      try {
        // generate link for email verification and send
        const verificationValue = crypto.randomBytes(64).toString("hex");
        const verificationLink = `http://${req.headers.host}/verify?verify=${verificationValue}`;
        console.log(verificationLink);

        // save the link temporarily in redis
        console.log({ dd: req.body.username, de: verificationValue });
        redis.set(verificationValue, req.body.username);

        // send the response (this must be sent on email)
        res.json({ verify: verificationLink });
        res.send();
      } catch (err) {
        console.log(err);
        return res.send(403, "CACHE_FAULT");
      }
    } catch (err) {
      console.log(err);
      return res.send(403, "UNEXPECTED_ERROR");
    }
  },

  signIn: (req, res) => {
    const username = req.body.username;
    const passwd = req.body.passwd;

    if (!validator.isAlphanumeric(username)) {
      res.status(403).send("INVALID_USERNAME");
      return;
    }

    User.findOne({ username: username }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(403).send();
      } else {
        if (!compareSync(passwd, result.hashed_password)) {
          res.status(401).send("WRONG_PASSWORD");
        } else {
          req.username = result.username;
          req.role = result.role;
          tokenUtility(req, res);
        }
      }
    });
  },

  // Issue a new refresh token and an
  // access token via token rotation
  refresh: (req, res) => {
    let refreshToken = req.cookies["x-refresh-token"];

    if (!refreshToken) return res.send(401).status("NO_REFRESH_TOKEN_PROVIDED");

    redis.get(refreshToken, (err, val) => {
      if (err) {
        res.clearCookie("x-refresh-token");
        res.clearCookie("x-access-token");
        return res
          .status(401)
          .send({ message: "REFRESH_TOKEN_NOT_FOUND_IN_DB" });
      }
      if (val != req.username) {
        return res
          .status(401)
          .send({ message: "REFRESH_TOKEN_NOT_FOUND_IN_DB" });
      }
    });

    tokenUtility(req, res);
    return;
  },

  gAuth: async (req, res) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const token = req.body.google_token;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const { email, name, picture, email_verified } = ticket.getPayload();
      const username = email.substring(0, email.lastIndexOf("@"));

      console.log({ username, name, email_verified });

      try {
        User.updateOne(
          { username: username },
          {
            username: username,
            email: email,
            email_verified: email_verified,
            name: name,
            picture: picture,
          },
          { upsert: true }
        );
      } catch (err) {
        throw err;
      }

      req.username = username;

      User.findOne({ username: username }, (err, docs) => {
        if (err) return;
        req.role = docs.role;
        console.log(req.role);
      });

      return tokenUtility(req, res, false);
    } catch (err) {
      return res.status(403).send("GAUTH_ERROR");
    }
  },

  logout: (req, res) => {
    let refreshToken = req.cookies["x-refresh-token"];
    if (!refreshToken) {
      res.status(200).send("ALREADY_LOGGED_OUT");
      return;
    }

    try {
      redis.del(refreshToken);
    } catch (err) {
      res.status(403).send("ERROR_LOGGING_OUT");
      return;
    }

    console.log(`${req.username} logged out.`);

    res.clearCookie("x-access-token");
    res.clearCookie("x-refresh-token");
    res.json({ message: "LOGGED_OUT" });
    res.send();
  },
};
