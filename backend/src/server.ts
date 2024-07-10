import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db/db';
import MainRouter from './routes/index.route';

dotenv.config();

const PORT = parseInt(process.env.PORT || "9000", 10);
const app = express();

app.use(express.json());

app.use('/LMS/V1', MainRouter);

app.listen(PORT,()=>{
    console.log("listening on port: ",PORT);
})
