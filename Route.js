const express = require('express');
const Auth = require('./Controller/Auth')
const operation = require('./Controller/DataOperation')
const JWTverify = require('./middleware/JWTverify')
const router = express.Router();
//Auth
router.post('/Signup',Auth.SignUp)
router.get('/Login',Auth.Login);

//TimeSheet operation
router.get('/EmployeeSideDisplay',JWTverify,operation.getEmployeeSid)
router.get('/ManagerSideDisplay',JWTverify,operation.getManagerSide)
router.post('/Senddata',JWTverify,operation.AddTimeSheetData)
router.put('/EditRate',JWTverify,operation.EditingRate);
router.delete('/deleteReport',JWTverify,operation.DeleteTimeSheetData)




module.exports = router;