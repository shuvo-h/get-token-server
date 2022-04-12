// External imports
const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./middleware/common/errorHandler");
const app = express();
const port = process.env.PORT || "5000";

// requested parsers 
app.use(express.json())
app.use(cors({ origin: true }));
app.use(express.urlencoded({limit:"50mb",extended:true}));

// Internal imports 
const authenticateRouter = require("./router/authenticateRouter")

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB connection successfull."))
.catch(err=>console.log(err))

// routing setup 
app.use("/authenticate",authenticateRouter)

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