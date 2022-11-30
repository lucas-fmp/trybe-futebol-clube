import express from 'express';
import validateTokenMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const router = express.Router();

router.get('/', MatchesController.getMatches);

router.use(validateTokenMiddleware);

router.post('/', MatchesController.newMatch);
router.patch('/:id', MatchesController.updateMatch);
router.patch('/:id/finish', MatchesController.finishMatch);

export default router;
