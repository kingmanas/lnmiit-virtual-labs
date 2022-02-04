const { LabSession, User, Problem } = require("../models/models");

module.exports = {
  // the size of each page is 20
  fetchLabs: (req, res) => {
    const page = req.params.page_id;

    if (!page) return res.send(400);

    if (page < 0) return res.send(403).status("PAGE_LESS_THAN_ZERO");

    LabSession.find(
      {},
      null,
      { limit: 20, skip: 20 * page, sort: { start_time: -1 } },
      (err, docs) => {
        if (err) console.log(err);
        const access_controlled_docs = [];
        const current_time = Date.now();

        // The admin can open and view each lab's contents he/she'll
        // get the open button

        // The student can only view the lab once it starts
        docs.forEach((doc) => {
          if (
            doc.admins.indexOf(req.username) != -1 ||
            current_time > doc.end_time
          )
            access_controlled_docs.push(doc);
        });

        return res.json(access_controlled_docs);
      }
    );
  },

  fetchLabProblems: async (req, res) => {
    const lab_id = req.params.lab_id;
    if (!lab_id) return res.sendStatus(400);

    // Don't let them fetch problems before the labs starts
    const current_time = Date.now();
    LabSession.findOne({ lab_id: lab_id }, "admins end_time", (err, doc) => {
      if (doc.end_time > current_time && doc.admins.indexOf(req.username) == -1)
        return res.status(403).status("LAB_NOT_YET_STARTED");

      Problem.find(
        { lab_id: lab_id },
        "problem_id problem_name score",
        (err, docs) => {
          if (err) return res.status(403).send("LAB_NOT_FOUND");
          res.json(docs);
        }
      );
    });
  },

  fetchProblem: (req, res) => {
    const lab_id = req.params.lab_id;
    const problem_id = req.params.problem_id;
    if (!lab_id || !problem_id) res.send(400);

    // Don't let them fetch problems before the labs starts
    const current_time = Date.now();
    LabSession.findOne({ lab_id: lab_id }, "admins end_time", (err, doc) => {
      if (doc.end_time > current_time && doc.admins.indexOf(req.username) == -1)
        return res.status(403).status("LAB_NOT_YET_STARTED");

      Problem.findOne(
        { lab_id: lab_id, problem_id: problem_id },
        "lab_id problem_id problem_name problem_setter " +
          "difficulty score memory_limit time_limit " +
          "visible_input visible_output problem_statement",
        (err, docs) => {
          if (err) return res.status(403).send("PROBLEM_NOT_FOUND");
          res.json(docs);
        }
      );
    });
  },

  createLab: (req, res) => {
    const lab = {};
    lab.subject = req.body.subject;
    lab.lab_id = req.body.lab_id;
    lab.start_time = req.body.start_time;
    lab.end_time = req.body.end_time;
    lab.admins = req.body.admins;

    if (lab.start_time >= lab.end_time || lab.start_time < Date.now()) {
      console.log("INVALID_LAB");
      return res.status(403).send("INVALID_LAB");
    }

    LabSession.updateOne({ lab_id: lab.lab_id }, lab, { upsert: true })
      .then(console.log("Lab created..."))
      .catch(console.log);

    res.send();
  },

  createProblem: (req, res) => {
    const problem = {};

    problem.lab_id = req.body.lab_id;
    problem.problem_id = req.body.problem_id;
    problem.problem_name = req.body.problem_name;
    problem.problem_setter = req.body.problem_setter;
    problem.difficulty = req.body.difficulty;
    problem.score = req.body.score;
    problem.memory_limit = req.body.memory_limit;
    problem.time_limit = req.body.time_limit;

    Problem.updateOne(
      { lab_id: problem.lab_id, problem_id: problem.problem_id },
      problem,
      {
        upsert: true,
      }
    )
      .then(() => console.log("Problem added..."))
      .catch(console.log);

    res.send();
  },

  labPageCount: async (req, res) => {
    const lab_count = await LabSession.countDocuments({});
    if (lab_count)
      return res.json({ pageCount: Math.floor(lab_count / 20 + 1) });
    else res.send(500);
  },
};
