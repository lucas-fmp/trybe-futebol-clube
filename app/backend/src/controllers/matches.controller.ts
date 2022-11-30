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
}

export default MatchesController;
