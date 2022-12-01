import express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get('/home', LeaderboardController.getLeaderboardHome);

export default router;
