"use-strict";
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  tokenVerificationMiddleware,
} = require("../middlewares/auth.middleware");

// POST
router.post("/verify", tokenVerificationMiddleware, (req, res) => {
  res.send({ username: req.username });
});

router.post("/login", (req, res) => {
  if (!req.body.username && !req.body.passwd && !req.body.google_token) {
    res.status(401).send("NO_CREDENTIALS");
    console.log(`INVALID_LOGIN_ATTEMPT by ${req.hostname}`);
    return;
  }

  // conventional login
  if (req.body.google_token) authController.gAuth(req, res);
  // gAuth
  else authController.signIn(req, res);
});

router.post("/logout", tokenVerificationMiddleware, authController.logout);

router.post("/register", authController.register);

module.exports = router;
