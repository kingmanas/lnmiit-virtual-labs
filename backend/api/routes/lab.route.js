const router = require("express").Router();
const labController = require("../controllers/lab.controller");

router.post("/", labController.fetchLabs);
router.post(/^\/:labId.*$/, labController.fetchLabProblems);
router.post("/:labId/problem/:problemId", labController.fetchProblem);

module.exports = router;
