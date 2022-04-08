// External imports
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./middlewares/common/errorHandler");

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
// app.use("/register",registerRouter)
// app.use("/login",loginRouter)

//  404 not found handler
app.use(notFoundHandler);

// common error handling
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("App is running on port",process.env.PORT);
})