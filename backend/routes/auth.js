const express = require ('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchDetails = require('../middleware/middleware');

// Create A JWT_SECRET Token ::
const JWT_SECRET = "ILoveItWhenYouCallMeSenorita";
 
// Route 1: Creating A User (No Login Required) (POST Request) ::
router.post('/createuser', 
[
    // Adding Validation Here ::
    body('name', 'enter a valid name').isLength({min: 3}),
    body('email', 'enter a valid Email').isEmail(),
    body('password', 'enter a valid password').isLength({min: 3})
], 
async (req, res)=>{

    // Return Bad Request If There Are Errors ::
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    // Add This Function In Try-Catch For Good Handling ::
    try {
    // Check Weather A User Is Exist Or Not ::
    let user = await Users.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Already Exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create A Function For User_Data_Creation ::
    user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user:{
          id: user.id
        }
      }
      const token = jwt.sign(data, JWT_SECRET);
      res.send({token});
    } 
    catch (error) {
      console.error(error);  
      res.status(500).send("internal server error !!")
    }
})

// Route 2: Authenticating As The User Is Exist Or Not (No Login Required) (POST Request) ::
router.post('/login', 
[
    // Adding Validation Here ::
    body('email', 'enter a valid Email').isEmail(),
    body('password', 'enter a valid password').exists()
], 
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    // Extracting A User From req.body ::
    const {email, password} = req.body;

    // Add This Function In Try-Catch For Good Handling ::
    try {
    // Check Weather A User Is Exist Or Not ::
    let user = await Users.findOne({email});
    if(!user){
      return res.status(400).json({error: "Enter Correct Credentials"})
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare){
      return res.status(400).json({error: "Enter Correct Credentials"})
    }

    const data = {
      user:{
        user: user.id
      }
    }
    const token = jwt.sign(data, JWT_SECRET);
    res.send({token});

  } 
  catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")
  }
})

// Route 3: Fetching Details Of User (Login Required) (POST Request) ::
router.post('/details', fetchDetails,
async (req, res)=>{  
  try {
    userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
  } 
  catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")
  }
})


module.exports = router;

// .............................................................................. 