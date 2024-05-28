const ManagerSchema = require("../models/ManagerSchema");
const Employee = {
    AddTimeSheetData:async (req,res)=>{
      console.log('hellow world')
      const date = new Date();
        const employeeDetail = {
            name:req.query.name,
            employeeEmail:req.query.email,
            date:date,
            timeRange:req.query.timeRange,
            projectName:req.query.projectName,
            taskDescription:req.query.taskDescription,
            rated:''
        }
        
        const data = await ManagerSchema.findOne({email:req.query.ManagerEmail});
        if(data){
         
          data.employeeData.push(employeeDetail)
          await ManagerSchema.updateOne({email:req.query.ManagerEmail},data)
            res.send('Submited')
        }else{
            res.send('Please enter correct manager email')
        }
      
    },
    getManagerSide:async (req,res)=>{
        try{
          
            const data = await ManagerSchema.findOne({email:req.query.ManagerEmail});
           
            res.json({
               display:data.employeeData
            })
          }catch(err){
           console.log(err)
          } 
    },
    getEmployeeSid:async (req,res)=>{
       try{
         const data = await ManagerSchema.findOne({email:req.query.ManagerEmail});
         const Employee  = data.employeeData.filter((elem)=>{
            return elem.employeeEmail === req.query.email;
         })
         res.json({
            display:Employee
         })
       }catch(err){
        console.log(err)
       } 
    }
    ,

    EditingRate:async (req,res)=>{
       console.log('I am working')
         const data = await ManagerSchema.findOne({email:req.query.ManagerEmail});
       
         if(data){
          const updatedData =  data.employeeData.filter((elem)=>{
            console.log('not match')
                if(elem.employeeEmail === req.query.EmployeeEmail && elem.projectName === req.query.projectName){
                    console.log('hua')
                    elem.rated=req.query.rated;
                }
                return elem;
            })
      await ManagerSchema.updateOne({email:req.query.ManagerEmail},{employeeData:updatedData})
      
          res.send('Rate has edited');
         }else{
            res.send('You are not exist')
         }
    },
    DeleteTimeSheetData:async (req,res)=>{
      const employeeDetail = {
          name:req.query.name,
          employeeEmail:req.query.email,
          date:req.query.date,
          timeRange:req.query.timeRange,
          projectName:req.query.projectName,
          taskDescription:req.query.taskDescription,
          rated:req.query.rated
      }
     
      
      const data = await ManagerSchema.findOne({email:req.query.ManagerEmail});
      if(data){
       
        data.employeeData.pop(employeeDetail)
        await ManagerSchema.updateOne({email:req.query.ManagerEmail},data)
          res.send('Deleted')
      }else{
          res.send('You are not valid manager')
      }
    
  },
  

}
module.exports = Employee;