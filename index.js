const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use('/TimeSheet',require('./Route'));
app.listen(4000,()=>{
    console.log('Server listen at port 4000');
})