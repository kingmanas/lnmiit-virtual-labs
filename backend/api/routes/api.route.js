// to access the api all requests will have to pass
// through the token verification middleware

const {
  tokenVerificationMiddleware,
} = require("../controllers/auth.controller");

const router = require("express").Router();
const labRoute = require("./lab.route");

router.use(tokenVerificationMiddleware);

router.post(/^labs?$/, labRoute);
