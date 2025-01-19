require('dotenv').config();


const express = require("express");
const app = express();
const cors = require("cors");
const mainrouter = require("./Routers/index");
const port =  3000;

//Some middlware type setup
app.use(cors());
app.use(express.json());

//The routing setup     
app.use('/api/v1', mainrouter);


app.listen(port,()=>{
    console.log("succesfully launched in the localhost 3000")
})