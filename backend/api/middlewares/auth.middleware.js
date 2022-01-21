const config = require("../config/auth.config");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { refresh } = require("../controllers/auth.controller");

module.exports = {
  tokenVerificationMiddleware: (req, res, next) => {
    let token = req.cookies["x-access-token"];

    if (!token) {
      next("NO_TOKEN");
    }

    token = crypto.AES.decrypt(token, config.cookie_encryption_key);

    try {
      jwt.verify(token, config.jwt_signing_key, (err, decoded) => {
        // if it's an error we'll try refreshing the token
        // using the existing refresh token
        if (err) {
          return refresh(req, res);
        }

        try {
          User.findOne({ username: decoded.username }, (err, doc) => {
            if (err) {
              throw err;
            }
            req.username = doc.username;
            req.role = doc.role;
            req.claims = doc.claims;
            console.log(`Verify token: ${req.username}`);
            next();
          });
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      next(err);
    }
  },
};
