import express from 'express';
import TeamsController from '../controllers/teams.controller';

const router = express.Router();

router.get('/', TeamsController.getTeams);
router.get('/:id', TeamsController.getTeamById);

export default router;
