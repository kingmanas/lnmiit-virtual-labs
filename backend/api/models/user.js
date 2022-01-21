"use-strict";

const Schema = require("mongoose").Schema;

const User = new Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  username: { type: String, default: "" },
  hashed_password: { type: String, default: "" },
  last_seen: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  picture: { type: String, default: "/api/static/profile_pic.svg" },
  // ADMIN > FACULTY > STUDENT
  role: {
    type: String,
    enum: ["ADMIN", "FACULTY", "STUDENT"],
    default: "STUDENT",
  },
  email_verified: { type: Boolean, default: false },
  subjects_enrolled: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
});

module.exports = User;
