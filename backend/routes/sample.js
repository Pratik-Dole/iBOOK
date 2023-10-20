const express = require ('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("hello pratik dole !!")
})

module.exports = router;