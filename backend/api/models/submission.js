"use-strict";

const Schema = require("mongoose").Schema;

const Submission = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  problem: { type: Schema.Types.ObjectId, ref: "Problem" },
  verdict: {
    type: String,
    enum: ["TLE", "MLE", "WA", "AC", "COMPILATION_ERR", "RUNNING"],
    default: "RUNNING",
  },
});

module.exports = Submission;
