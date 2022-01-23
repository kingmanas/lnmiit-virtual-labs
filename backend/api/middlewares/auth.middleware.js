const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const { refresh } = require("../controllers/auth.controller");

module.exports = {
  tokenVerificationMiddleware: (req, res, next) => {
    let token = req.cookies["x-access-token"];

    if (!token) {
      return res.status(401).send({ message: "NO_TOKEN" });
    }

    try {
      const unverifiedPayload = jwt.decode(token, config.jwt_signing_key);

      req.username = unverifiedPayload.username;
      req.role = unverifiedPayload.role;
      req.claims = unverifiedPayload.claims;

      jwt.verify(token, config.jwt_signing_key, (err, decoded) => {
        // if it's an error we'll try refreshing the token
        // using the existing refresh token

        if (err) {
          console.log("VERIFICATION_ERROR_SO_REFRESHING");
          return refresh(req, res);
        }

        try {
          User.findOne({ username: decoded.username }, (err, doc) => {
            if (err) {
              throw err;
            }
            console.log(`Verifed token: ${req.username}`);
            next();
          });
        } catch (err) {
          throw err;
        }
      });
    } catch (err) {
      return next(err);
    }
  },
};
