import express from 'express';
import userRouter from './user.router';
import teamsRouter from './teams.router';

const routers = express.Router();

routers.use('/login', userRouter);
routers.use('/teams', teamsRouter);

export default routers;
