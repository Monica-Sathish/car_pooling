const mongoose = require("mongoose");
const book_schema = new mongoose.Schema({
    book_id: { type: String, default: null },
    cust_name: { type: String},
    cust_id: { type: String },
    route_name: { type: String },
    route_id: { type: String },
    token: { type: String },
  },
  {
    collection:'book'
  }
  );
  module.exports = mongoose.model("book_schema", book_schema);