import express from 'express';
import MatchesController from '../controllers/matches.controller';

const router = express.Router();

router.get('/', MatchesController.getMatches);

export default router;
