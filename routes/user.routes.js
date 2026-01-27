import {Router} from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller.js';
import { get } from 'mongoose';
import { autherization, autherizationAdmin } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', autherizationAdmin ,getAllUsers);

userRouter.get('/:id', autherization, getUser);

userRouter.post('/', (req, res) => {
    res.send('create new Users');
});

userRouter.put('/:id', (req, res) => {
    res.send('Update User with ID: ' + req.params.id);
});

userRouter.delete('/:id', (req, res) => {
    res.send('Delete User with ID: ' + req.params.id);
});

export default userRouter;