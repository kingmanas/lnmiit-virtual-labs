function getProblem(req, res) {
  const lab_id = req.body.lab_id;
  const problem_id = req.body.problem_id;
}

function addProblem(req, res) {
  const problem = req.body.problem;

}

module.exports = (req, res) => {
  switch (req.body.problem) {
    case "get/problem":
      getProblem(req, res);
      break;

    default:
      res.send("INVALID_PROBLEM_QUERY");
  }
};
