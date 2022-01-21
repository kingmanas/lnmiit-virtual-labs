"use-strict";

const Schema = require("mongoose").Schema;
const User = require("./user");
const Problem = require("./problem");

const LabSession = new Schema({
  // subject
  subject: { type: Schema.Types.ObjectId, ref: "Subject" },

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
  admins: [User],

  problems: [Problem],
});

module.exports = LabSession;
