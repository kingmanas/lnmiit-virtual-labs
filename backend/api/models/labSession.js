"use-strict";

const Schema = require("mongoose").Schema;
const User = require("./user");
const Problem = require("./problem");

const LabSession = new Schema({
  // subject
  subject: String,

  // this will be auto increment in nature
  lab_id: Number,

  // lab title
  title: String,

  // Default start time is 30 minutes post contest creation.
  start_time: {
    type: Date,
    default: () => {
      Date.now() + 30 * 60 * 1000;
    },
  },

  // Default lab session duration is 2 hours.
  end_time: {
    type: Date,
    default: () => {
      Date.now + 2 * 60 * 60 * 1000;
    },
  },

  // The people who can view, modify and delete lab contests.
  admins: [String],
});

module.exports = LabSession;
