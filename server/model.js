const mongoose = require('mongoose')

let Userdetails = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
      },
})

module.exports = mongoose.model('Userdetails',Userdetails)