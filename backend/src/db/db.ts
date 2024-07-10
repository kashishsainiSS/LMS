import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI:string | undefined = process.env["MONGODB_URI"];

const connecttoDatabase = async ()=>{
    try{
        if(!MONGODB_URI){
            throw new Error("MONGODB_URI is not defined in environment variable");
        }
     await mongoose.connect(MONGODB_URI);
     console.log("Connected to MongoDB")
    }catch(error){
        console.log("Error connecting to mongodb: " + error);
        process.exit(1);  // exit the process if failure
    }
}

connecttoDatabase();
export default mongoose.connection;