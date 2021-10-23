const mongoose = require("mongoose");
const route_schema = new mongoose.Schema({
    route_name: { type: String },
    route_id: { type: String, unique: true }
  },
  {
    collection:'route'
  }
  );
  module.exports = mongoose.model("route_schema", route_schema);