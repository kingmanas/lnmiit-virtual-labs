"use-strict";

const Schema = require("mongoose").Schema;

const Subject = new Schema({
  name: String,
});

module.exports = Subject;
