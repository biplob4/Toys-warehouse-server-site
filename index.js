const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();


app.get('/',(req,res)=>{
    res.send('server is Raddy')
})
app.listen(port,()=>{
    console.log('server is Ranning');
})
app.listen(port,()=>{
    console.log('server is Ranning');
})
app.listen(port,()=>{
    console.log('server is Ranning');
})
app.listen(port,()=>{
    console.log('server is Ranning');
})