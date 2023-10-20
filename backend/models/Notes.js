const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create A Schema For Notes ::
const notesSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title:{
        type: String,
        require: true
    },
    discription:{
        type: String,
        require: true
    },
    tag:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model("notes", notesSchema);