require("dotenv").config();
const app2= require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin_schema");
const jwt = require("jsonwebtoken");
const auth = require("../authetication/auth");
//const app2 = express();
//app2.use(express.json());
//console.log("hello");
app2.post("/register", async (req, res) => {
    try {
      // Get admin input
      const { admin_name, email, password } = req.body;
  
      // Validate admin input
      if (!(email && password && admin_name)) {
        console.log("hello")
        res.status(400).send("All input is required");
      }
  
      // check if admin already exist
      // Validate if admin exist in our database
      const oldAdmin = await Admin.findOne({ email });
  
      if (oldAdmin) {
        return res.status(409).send("Admin Already Exist. Please Login");
      }
  
      //Encrypt admin password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create admin in our database
      const admin = await Admin.create({
        admin_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { admin_id: admin._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save admin token
      admin.token = token;
      // return new admin
      res.status(201).json(admin);
    } catch (err) {
      console.log(err);
    }
  });
  
  app2.post("/login", async (req, res, next) => {
    try {
      // Get admin input
      const { email, password } = req.body;
  
      // Validate admin input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if admin exist in our database
      const admin = await Admin.findOne({ email });
  
      if (admin && (await bcrypt.compare(password, admin.password))) {
        // Create token
        const token = jwt.sign(
          { admin_id: admin._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save admin token
        admin.token = token;
        // admin
        console.log('Hello world')
        res.status(200).json(admin);
      }else{
        res.status(400).send('Invalid Credentials');
      }
    } catch (err) {
      console.log(err);
    }
  });
  module.exports = app2