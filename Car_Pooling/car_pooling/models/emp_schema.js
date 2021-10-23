const mongoose = require("mongoose");
const emp_schema = new mongoose.Schema({
    emp_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    route_name: { type: String },
    route_id: { type: String },
    token: { type: String },
  },
  {
    collection:'emp'
  }
  );
  module.exports = mongoose.model("emp_schema", emp_schema);