require('../Config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeSchema = require("../models/EmployeeSchema");
const ManagerSchema = require("../models/ManagerSchema");
const AllId = require("../UserId");
const Auth = {
  SignUp: async (req, res) => {
  console.log('signup function has run')
  const token = jwt.sign({ email:req.query.email }, 'shippingSystem', { expiresIn: '1h' });
  const hashedPassword = await bcrypt.hash(req.query.password, 10);
    try {
     
        if (req.query.EmployeeId_or_ManagerId === AllId.EmployeeId) {
            console.log('phase 1')
          
          const EmployeeExist = await EmployeeSchema.findOne({email:req.query.email});
          console.log(EmployeeExist)
          if(!EmployeeExist){
            const EmployeeData = new EmployeeSchema({
                name: req.query.name,
                email: req.query.email,
                position: "Employee",
                password:hashedPassword,
                manager_email: req.query.manager_email,
              });
              await EmployeeData.save();
              res.json({
                message:'/TimeSheetForm',
                token:token
              });
              
          }else{
            res.json({
              message:'user already exist',
    
            });
          }
         
        } else if (req.query.EmployeeId_or_ManagerId === AllId.ManagerId) {
          const ManagerExist = await ManagerSchema.findOne({email:req.query.email});
          if(!ManagerExist){
            const ManagerData = new ManagerSchema({
                name: req.query.name,
                email: req.query.email,
                position: "Manager",
                password:hashedPassword,
                EmployeeData: [],
              });
              await ManagerData.save();
              res.json({
                message:'/EmployeeDetail',
                token:token
              });
             
          }else{
            res.json({
              message:'user already exist',
    
            });
          }
         
        } else {
          res.json({
            message:'you are not exist in this firm',
  
          });
        }
      
    } catch (err) {
      console.log(err);
    }
  },
  Login: async (req, res) => {
    const token = jwt.sign({ email:req.query.email }, 'shippingSystem', { expiresIn: '1h' });
    try{
      console.log(req.query.EmployeeId_or_ManagerId);
         if(req.query.EmployeeId_or_ManagerId===AllId.EmployeeId){
          console.log('Phase 2');
            const data = await EmployeeSchema.findOne({email:req.query.email});
           
            const isPasswordValid = await bcrypt.compare(req.query.password, data.password);
            if(data && isPasswordValid){
              console.log('phase 3')
                res.json({
                  message:'/TimeSheetForm',
                  token:token
                });
            }else{
              res.json({
                message:'wrong password',
      
              });
            }
         }else if(req.query.EmployeeId_or_ManagerId === AllId.ManagerId){
           
            const data = await ManagerSchema.findOne({email:req.query.email});
            
            const isPasswordValid = await bcrypt.compare(req.query.password, data.password);
            if(data && isPasswordValid){
              res.json({
                message:'/EmployeeDetail',
                token:token
              });
            }else{
              res.json({
                message:'wrong password',
      
              });
            }

         }else{
          res.json({
            message:'invalid detail',
  
          });
         }
    }catch(err){
         console.log(err)
    }
  },
};
module.exports = Auth;
