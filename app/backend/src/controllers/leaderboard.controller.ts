import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  public static async getLeaderboardHome(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getLeaderboardHome();

    return res.status(200).json(leaderboard);
  }

  public static async getLeaderboardAway(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getLeaderboardAway();

    return res.status(200).json(leaderboard);
  }

  public static async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getLeaderboard();

    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
