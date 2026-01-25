//except for default export every import should be in {}
//eslint to keep code clean and error free
//nodemon is used to restart server automatically on code changes in dev environment only so it is in dev script
//start is for production environment to start the server
//"type": "module" is added in package.json to use es6 import export syntax instead of commonjs require syntax

//calling connectToDatabase inside app.listen to ensure DB connection is established when server starts

import express from 'express';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscriptions.routes.js';
import {PORT} from './config/env.js';
import connectToDatabase from './database/db.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/subscriptions', subscriptionRouter);  

app.get('/', (req, res) => {
    res.send('Hello, World!');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();
});

export default app;