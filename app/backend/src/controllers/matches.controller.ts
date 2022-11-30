import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  public static async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await MatchesService.getInProgressOrFinishedMatches(inProgress as string);

      return res.status(200).json(matches);
    }

    const matches = await MatchesService.getMatches();

    return res.status(200).json(matches);
  }

  public static async newMatch(req: Request, res: Response): Promise<Response> {
    const matchData = req.body;

    const match = await MatchesService.newMatch(matchData);

    return res.status(201).json(match);
  }

  public static async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await MatchesService.updateMatchStatus(id);

    return res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesService.updateMatchGoals(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Updated' });
  }
}

export default MatchesController;
