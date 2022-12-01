import express from 'express';
import userRouter from './user.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';
import leaderboardRouter from './leaderboard.router';

const routers = express.Router();

routers.use('/login', userRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchesRouter);
routers.use('/leaderboard', leaderboardRouter);

export default routers;
