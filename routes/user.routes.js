import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('Get Users');
});

userRouter.get('/:id', (req, res) => {
    res.send(`Get User with ID: ${req.params.id}`);
});

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