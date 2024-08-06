import { Request } from "express";

import { IAccount } from "../src/repository/schema/accounts.schema";

declare global{
    namespace Express{
        interface Request{
            user?:IAccount;
        }
    }
}