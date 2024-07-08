import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db/db';

dotenv.config();

const PORT = parseInt(process.env.PORT || "9000", 10);
const app = express();

app.use(express.json());


app.listen(PORT,(req,res)=>{
    console.log("listening on port: ",PORT);
})
