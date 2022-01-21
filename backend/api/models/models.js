const LabSession = require("./labSession");
const Problem = require("./problem");
const Subject = require("./subject");
const Submission = require("./submission");
const User = require("./user");

const { db } = require("../utils/connection");

module.exports = {
  LabSession: db.model("LabSession", LabSession),
  Problem: db.model("Problem", Problem),
  Subject: db.model("Subject", Subject),
  Submission: db.model("Submission", Submission),
  User: db.model("User", User),
};
