const express = require('express')
const app = express()
const port = 5000
const connectToMongo = require ('./mDB')
var cors = require('cors')
 
app.use(cors())
// Calling The Function From mDB.js ::
connectToMongo(); 

// Add Middle-Ware For Dealing With JSON :: 
app.use(express.json())

// Create A Routes For DataFetching ::
app.use('/', require('./routes/sample')); 
app.use('/auth', require('./routes/auth')); 
app.use('/notes', require('./routes/notes')); 
  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

// ........................................................... 