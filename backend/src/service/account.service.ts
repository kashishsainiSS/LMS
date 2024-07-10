import {CreateUserRepo} from "../repository/account.repository";
import {Request,Response } from "express";

export async function CreateUserService(req:Request, res:Response){
    try{
   const data :any= req.body;
    const result:any = await CreateUserRepo(data);
    if(result.status === "success"){
        return res.status(200).json({
            status:"success",
            data:result.token
        })
    }
    }catch(error:any){
        throw new Error(error.message);
    }
}