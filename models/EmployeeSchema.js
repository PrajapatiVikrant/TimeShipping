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
     manager_email:{
      type:String
     }

})
const EmployeeSchema = mongoose.model('Employee',User);

module.exports = EmployeeSchema;