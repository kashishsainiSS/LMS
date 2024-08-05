import express from 'express';
import { CreateUserService } from '../service/account.service';
import { ActivateUser, loginUser } from '../repository/account.repository';

const Account = express.Router();

Account.use('/registration',CreateUserService);
Account.use('/activateAccount',ActivateUser);
Account.use('/login',loginUser);

export default Account;