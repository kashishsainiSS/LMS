import Account, { IAccount } from "./schema/accounts.schema";
import bcrypt from "bcryptjs";
import { hash } from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function hashPassword(password: string) {
  const salt_rounds = process.env.SALT_ROUNDS;
  if (!salt_rounds) {
    throw new Error("Salt Rounds is not set in Environment Variables");
  }
  const SALT_ROUNDS = parseInt(salt_rounds, 10);
  if (isNaN(SALT_ROUNDS)) {
    throw new Error("SALT ROUNDS is not configured");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function CreateUserRepo(data: IAccount) {
  try {
    const hashedPassword= await hashPassword(data.password);
    const User = await Account.create(new Account({
        name:data.name,
        username:data.username,
        password:hashedPassword,
        role:data.role
    }))
    const userId= User._id;
    if(!SECRET_KEY){
        throw new Error("Secret key is required");
    }
    const token = jwt.sign({ userId }, SECRET_KEY);
    return{
        status:'success',
        token:token
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
