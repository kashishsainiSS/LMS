import express from 'express';
import { CreateUserService } from '../service/account.service';
import { ActivateUser, loginUser,logoutUser } from '../repository/account.repository';
import { isAuthenticated } from '../middlewares/auth.middleware';

const Account = express.Router();

Account.post('/registration',CreateUserService);
Account.post('/activateAccount',ActivateUser);
Account.post('/login',loginUser);
Account.get('/logout',isAuthenticated,logoutUser);

export default Account;