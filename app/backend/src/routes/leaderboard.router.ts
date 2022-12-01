import express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = express.Router();

router.get('/home', LeaderboardController.getLeaderboardHome);
router.get('/away', LeaderboardController.getLeaderboardAway);

export default router;
