"use-strict";
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {
  tokenVerificationMiddleware,
} = require("../middlewares/auth.middleware");

// POST
router.use("/verify", tokenVerificationMiddleware);

router.post("/register", authController.register);

router.post("/login", (req, res) => {
  if (!req.body.username && !req.body.passwd && !req.body.google_token) {
    res.status(401).send("INVALID_CREDENTIALS");
    console.log(`INVALID_LOGIN_ATTEMPT by ${req.hostname}`);
    return;
  }
  if (!req.body.google_token) authController.signIn(req, res);
  else authController.gAuth(req, res);
});

router.post("/logout", authController.logout);

module.exports = router;
