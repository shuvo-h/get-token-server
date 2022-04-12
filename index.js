// External imports
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./middleware/common/errorHandler");
const app = express();
const port = process.env.SERVER_RUNNING_PORT || 5001;

// Internal imports 


// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB connection successfull."))
.catch(err=>console.log(err))

// requested parsers 
app.use(express.json())

// routing setup 


// public test route 
app.get("/",(req,res)=>{
    res.send("Server is working, go ahead")
})

//  404 not found handler
app.use(notFoundHandler);

// common error handling
app.use(errorHandler)

// listen app 
app.listen(port,()=>{
    console.log("App is running on port",port);
})