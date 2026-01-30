import {Router} from 'express';
import { deleteUser, getAllUsers, getUser } from '../controllers/user.controller.js';
import { get } from 'mongoose';
import { autherization, autherizationAdmin } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', autherizationAdmin ,getAllUsers);

userRouter.get('/:id', autherization, getUser);

userRouter.delete('/:id', autherization, deleteUser);

export default userRouter;