// to access the api all requests will have to pass
// through the token verification middleware

const router = require("express").Router();
const labController = require("../controllers/lab.controller");

router.get("/lab/page_count", labController.labPageCount);
// show 20 labs on each page, supporting pagination
router.get("/lab/:page_id", labController.fetchLabs);

router.get("/lab/:lab_id/problems", labController.fetchLabProblems);
router.get("/lab/:lab_id/problem/:problem_id", labController.fetchProblem);

router.post("/create/lab", (req, res, next) => {
  if (req.role != "ADMIN") return res.status(403).send("FORBIDDEN_RESOURCE");
  console.log(`ADMIN:${req.username} posted at ${req.originalUrl} `);
  labController.createLab(req, res);
  next();
});

router.post("/create/problem", (req, res, next) => {
  if (req.role != "ADMIN") return res.status(403).send("FORBIDDEN_RESOURCE");
  console.log(`ADMIN:${req.username} posted at ${req.originalUrl} `);
  labController.createProblem(req, res);
  next();
});

module.exports = router;
