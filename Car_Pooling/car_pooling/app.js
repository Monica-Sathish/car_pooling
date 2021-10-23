require("dotenv").config();
require("./config/database").connect();
var nodemailer = require('nodemailer');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("./models/admin_schema");
const Emp = require("./models/emp_schema");
const Route = require("./models/Route_schema");
const auth = require("./controller/authetication/auth");
const app1 = express.Router()
app1.use(express.json());
//console.log("hello");
const admin = require('./controller/routes/admin')
const admin_works = require('./controller/routes/admin_works')
const emp = require('./controller/routes/emp')
const emp_works = require('./controller/routes/emp_works')
//console.log("hello");
app1.use('/',admin)
//app1.use('/admin_works',admin_works)
//app1.use('/emp',emp)
//app1.use('/emp_works',emp_works)
//console.log("hello");
module.exports = app1;