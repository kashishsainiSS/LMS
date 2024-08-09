import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../db/redis";
import { IAccount } from "../repository/schema/accounts.schema";

interface UserRequest extends Request {
  user?:IAccount
  };

  // Authenticated User
export const isAuthenticated = CatchAsyncError(async (req:any, res:Response, next:NextFunction)=>{
    try{
        // console.log("req",req);
        console.log("req.cookies",req.cookies);
      const access_token = req.cookies.access_token as string;
      console.log("accessToken",access_token);

      if(!access_token){
        return next(new ErrorHandler("Please login to access this route",400));
      }
      const decode = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

      if(!decode){
        return next(new ErrorHandler("Invalid token",400));
      }

      const user = await redis.get(decode.id);
    

      if(!user){
        return next(new ErrorHandler("User not found",400));
      }

      req.user = JSON.parse(user);

    // req.user = undefined;

      next();

    }catch(error:any){
        return next(new ErrorHandler(error.message,401));
    }
})

// validate user role
export const authorizeRoles =(...roles:string[])=>{
  return (req:any, res:Response, next:NextFunction)=>{
    if(!roles.includes(req.user?.role || "")){
      return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,403));
    }
    next();
  }
}