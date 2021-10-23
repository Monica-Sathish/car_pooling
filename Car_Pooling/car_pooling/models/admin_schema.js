const mongoose = require("mongoose");

const admin_schema = new mongoose.Schema({
  admin_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
},
{
  collection:'admin'
}
);

module.exports = mongoose.model("admin_schema", admin_schema);
