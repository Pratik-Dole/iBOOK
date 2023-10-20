const express = require ('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const fetchDetails = require('../middleware/middleware');

// Route 1: Adding Notes (POST Request) ::
router.post('/addNotes', fetchDetails, 
[
    // Adding Validation Here ::
    body('title', 'enter a valid name').isLength({min: 3}),
    body('discription', 'enter a valid Email').isLength({min: 5}),
    body('tag', 'enter a valid password').isLength({min: 2})
],
async (req, res)=>{
try {
    // Getting Out Details With Note Variable ::
    const {title, discription, tag} = req.body;

    // Return Bad Request If There Are Errors ::
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const note = new Notes({
        title, discription, tag, user: req.user.id
    })
    const savedNotes = await note.save()

    res.json(savedNotes);
} 
catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")       
}
})

// Route 2: Fetching All Notes (GET Request) ::
router.get('/fetchNotes', fetchDetails, 
async (req, res)=>{
try {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
} 
catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")
}
})

// Route 3: Updating Notes (PUT Request) ::
router.put('/updateNotes/:id', fetchDetails, 
async (req, res)=>{
try{     
    const {title, discription, tag} = req.body;

    // Create A NewNote Object ::
    const newNote = {}
    if(title){ newNote.title = title};
    if(discription){ newNote.discription = discription};
    if(tag){ newNote.tag = tag};

    // Find The Note For Update & Then Update It ::
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Check That User Is Or Not ::
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    // Now We Can Update The Existing Note ::
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

    res.json({note});
}
catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")
}
})

// Route 4: Deleting Notes (DELETE Request) ::
router.delete('/deleteNotes/:id', fetchDetails, 
async (req, res)=>{
try{
     const {title, discription, tag} = req.body;

    // Find The Note For Delete & Then Delete It ::
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Check That User Is Or Not ::
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    // Checking If User Own This Note Or Not And Then Allow For Deletion ::
    note = await Notes.findByIdAndDelete(req.params.id)

    res.json("Note Deleted Successfully !!");     
}
catch (error) {
    console.error(error);  
    res.status(500).send("internal server error !!")
}
})
 
module.exports = router; 

// .............................................................................. 