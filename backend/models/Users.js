const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create A Schema For Users ::
const usersSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  const User = mongoose.model("users", usersSchema);
  module.exports = User;