"use-strict";

const Schema = require("mongoose").Schema;

const Problem = new Schema({
  // a foreign key
  lab_id: String,

  problem_id: String,

  problem_name: String,

  problem_setter: [String],

  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    default: "MEDIUM",
  },

  // A problem must be less or equal to 100 in score.
  score: { type: Number, default: 50 },

  // in MB
  memory_limit: { type: Number, max: 256 },

  // in milliseconds per test case
  time_limit: { type: Number, max: 5000 },

  // two controllers: addProblem & refreshProblem
  // will read from the static dir based on the
  // naming convention and create entries in the database
  problem_statement: String,
  visible_input: [String],
  visible_output: [String],
  hidden_input: [String],
  hidden_output: [String],
});

module.exports = Problem;
