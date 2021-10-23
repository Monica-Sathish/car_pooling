require("dotenv").config();
const express = require('express')
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin_schema");
const Emp = require("../../models/emp_schema");
const Route = require("../../models/Route_schema");
const jwt = require("jsonwebtoken");
const auth = require("../authetication/auth");
const admin = require('./admin');
const router = express.Router()
//const app2 = express();
//app2.use(express.json());
//console.log("hello");
router.post('/saveEmployee', auth, async(req,res) => {
    const emp = new Emp({
        emp_name: req.body.emp_name,
        email: req.body.email,
        password: req.body.password,
        route_name: req.body.route_name,
        route_id: req.body.route_id,
    })
    try{
        const a1 =  await emp.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.get('/getEmployee', auth, async(req,res) => {
    try{
           const emps = await Emp.find()
           res.json(emps)
    }catch(err){
        res.send('Error ' + err)
    }
})
router.get('/getEmployee/:id', auth ,async(req,res) => {
    try{
           const emp = await Emp.findById(req.params.id)
           res.json(emp)
    }catch(err){
        res.send('Error ' + err)
    }
})
router.patch('/editEmployee/:id', auth ,async(req,res)=> {
    try{
        const emp = await Emp.findById(req.params.id) 
        emp.emp_name = req.body.emp_name
        emp.email = req.body.email
        emp.route_name = req.body.route_name
        emp.route_id = req.body.route_id
        const a1 = await emp.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
router.delete('/deleteEmployee/:id',async(req,res)=> {
    try{
        const emp = await Emp.findById(req.params.id)
        const a1 = await emp.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
//crud in routes
router.post('/addRoutes', auth, async(req,res) => {
    const route = new Route({
        route_name: req.body.route_name,
        route_id: req.body.route_id
    })
    try{
        const a1 =  await route.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.get('/getRoutes', auth, async(req,res) => {
    try{
           const routes = await Route.find();
           res.json(routes)
    }catch(err){
        res.send('Error ' + err)
    }
})
/**router.get('/getRoutes/:id', auth ,async(req,res) => {
    try{
           const routes = await Route.findById(req.params.id).select({route_name:1})
           res.json(route)
    }catch(err){
        res.send('Error ' + err)
    }
})**/
router.patch('/editRoutes/:id', auth ,async(req,res)=> {
    try{
        const route = await Route.findById(req.params.id) 
        route.route_name = req.body.route_name
        route.route_id = req.body.route_id
        const a1 = await route.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
router.delete('/deleteRoutes/:id',async(req,res)=> {
    try{
        const route = await Route.findById(req.params.id)
        const a1 = await route.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
module.exports = router;


