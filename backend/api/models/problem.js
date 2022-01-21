"use-strict";

const Schema = require("mongoose").Schema;
const User = require("./user");

const Problem = new Schema({
  // a foreign key
  lab_session: { type: Schema.Types.ObjectId, ref: "LabSession" },

  problem_name: String,

  problem_setter: [User],

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

  // path to file on server
  problem_statement: String,

  // path to files on server
  visible_input: [String],
  visible_output: [String],

  // path to files on server
  hidden_input: [String],
  hidden_output: [String],
});

module.exports = Problem;
