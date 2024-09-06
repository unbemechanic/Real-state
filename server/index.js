const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/auth');
const cors = require('cors')


const app = express(); 
app.use(express.json()) // to use json file in the project
app.use(cors())
const PORT = process.env.PORT

app.use('/server',router)

mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("MongoDB is connected")
})
.catch((err)=>{
    console.log("problem with MongoDB", err)
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

//middleware to handle error 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 501;
    const message = err.message || "Internal Error from middleware";
    console.log(err)
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});