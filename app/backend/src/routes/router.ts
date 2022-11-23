import express from 'express';
import userRouter from './user.router';

const routers = express.Router();

routers.use('/login', userRouter);

export default routers;
