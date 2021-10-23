require("dotenv").config();
const express = require('express')
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin_schema");
const Book = require("../../models/emp_schema");
const book = require("../../models/book_schema");
const Route = require("../../models/Route_schema");
const jwt = require("jsonwebtoken");
const auth = require("../authetication/auth");
const admin = require('./admin');
const router = express.Router()


router.post('/saveBooking', auth, async(req,res) => {
    const book = new Book({
        book_name: req.body.book_name,
        email: req.body.email,
        password: req.body.password,
        route_name: req.body.route_name,
        route_id: req.body.route_id,
    })
    try{
        const a1 =  await book.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.patch('/editBooking/:id', auth ,async(req,res)=> {
    try{
        const book = await Book.findById(req.params.id) 
        book.book_name = req.body.book_name
        book.cust_name = req.body.email
        book.route_name = req.body.route_name
        book.route_id = req.body.route_id
        const a1 = await emp.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
router.delete('/removeBooking/:id',async(req,res)=> {
    try{
        const emp = await Book.findById(req.params.id)
        const a1 = await emp.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
//crud in routes
router.get('/getRoutes', auth, async(req,res) => {
    try{
           const routes = await Route.find();
           res.json(routes)
    }catch(err){
        res.send('Error ' + err)
    }
})
router.get('/getRoutes/:id', auth ,async(req,res) => {
    try{
           const routes = await Route.findById(req.params.id).select({route_name:1})
           res.json(route)
    }catch(err){
        res.send('Error ' + err)
    }
})

module.exports = router;