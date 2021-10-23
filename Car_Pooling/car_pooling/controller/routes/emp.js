require("dotenv").config();
const app2= require("express").Router();
const bcrypt = require("bcrypt");
const Emp = require("../../models/emp_schema");
const jwt = require("jsonwebtoken");
const auth = require("../authetication/auth");
//const app2 = express();
//app2.use(express.json());
//console.log("hello");
app2.post("/register", async (req, res) => {
    //console.log("hello1");
    try {
      // Get emp input
      const { emp_name, email, password } = req.body;
  
      // Validate emp input
      if (!(email && password && emp_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if emp already exist
      // Validate if emp exist in our database
      const oldEmp = await Emp.findOne({ email });
  
      if (oldEmp) {
        return res.status(409).send("Emp Already Exist. Please Login");
      }
  
      //Encrypt emp password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create emp in our database
      const emp = await Emp.create({
        emp_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { emp_id: emp._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save emp token
      emp.token = token;
      // return new emp
      res.status(201).json(emp);
    } catch (err) {
      console.log(err);
    }
  });
  
  app2.post("/login", async (req, res) => {
    try {
      // Get emp input
      const { email, password } = req.body;
  
      // Validate emp input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if emp exist in our database
      const emp = await Emp.findOne({ email });
  
      if (emp && (await bcrypt.compare(password, emp.password))) {
        // Create token
        const token = jwt.sign(
          { emp_id: emp._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save emp token
        emp.token = token;
        // emp
        res.status(200).json(emp);
      }else{
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  });
  module.exports = app2
