import {Router} from 'express';
import {signIn} from '../controllers/auth.controller.js';
import {signUp} from '../controllers/auth.controller.js';
import {signOut} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => {
    signIn
});

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-out', (req, res) => {
    signOut
});

export default authRouter;