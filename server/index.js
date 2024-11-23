import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import seedDatabase from "../server/controllers/seedController.js"
import getTransactions from "./controllers/TransactionController.js";
import getStatistics from "./controllers/statisticsController.js";
import getBarchart from "./controllers/barchartController.js";



const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT

const connection = async ()=>{
    const mongoConnection = await mongoose.connect(process.env.MONGO_URL)
    if(mongoConnection){
        console.log("mongoDB connected successfully")
    }
 }
 
 connection ()

 

app.get('/seed', seedDatabase);
app.get('/transaction', getTransactions);
app.get('/statistics', getStatistics);
app.get('/barchart', getBarchart)

app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}` )
})