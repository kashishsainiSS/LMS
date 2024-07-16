import express from 'express';
import { CreateUserService } from '../service/account.service';
import { ActivateUser } from '../repository/account.repository';

const Account = express.Router();

Account.use('/registration',CreateUserService);
Account.use('/activateAccount',ActivateUser)

export default Account;