import express from 'express';
import { CreateUserService } from '../service/account.service';

const Account = express.Router();

Account.use('/signup',CreateUserService);

export default Account;