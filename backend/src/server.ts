import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db/db';
import MainRouter from './routes/index.route';
import { ErrorMiddleware } from './middlewares/error';

dotenv.config();

const PORT = parseInt(process.env.PORT || "9000", 10);
const app = express();

// body parser
app.use(express.json({limit:"50mb"}));

// cookie parser
app.use(cookieParser());

// cross origin resource sharing
app.use(cors({                            
    origin:process.env.ORIGIN                         
}));                    


app.use('/LMS/V1', MainRouter);

// unknown route
app.all("*", (req:Request,res:Response, next:NextFunction)=>{
    const err= new Error(`Route ${req.originalUrl} not foune`) as any;
    err.statusCode= 404;
    next(err)
});

app.use(ErrorMiddleware);

app.listen(PORT,()=>{
    console.log("listening on port: ",PORT);
})
