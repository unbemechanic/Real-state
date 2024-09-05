import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const app = express();
const PORT = process.env.PORT

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