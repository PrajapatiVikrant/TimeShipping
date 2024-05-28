const mongoose = require('mongoose');
const User = mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     position:{
        type:String,
        required:true
     },
     password:{
      type:String,
      required:true
     },
     employeeData:{
        type:Array,
     }

})
const ManagerSchema = mongoose.model('Manager',User);

module.exports = ManagerSchema;