
import express from "express";
import Account from "./account.route";
const MainRouter= express.Router();

MainRouter.use("/account",Account)

export default MainRouter;