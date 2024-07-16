import {registrationUser} from "../repository/account.repository";
import {NextFunction, Request,Response } from "express";

export async function CreateUserService(req:Request, res:Response,next:NextFunction){
    try{
   const data :any= req.body;
    const result:any = await registrationUser(req,res,next);
    console.log("result: " + result);
    // if(result.status === "success"){
    //     return res.status(200).json({
    //         status:"success",
    //         data:result.token
    //     })
    // }
    }catch(error:any){
        throw new Error(error.message);
    }
}