import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import CustomError from '../exceptions/error.exception';

class TeamsController {
  public static async getTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamsService.getTeams();

    if (!teams || teams.length === 0) {
      throw new CustomError(404, 'Not found');
    }

    return res.status(200).json(teams);
  }

  public static async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await TeamsService.getTeamById(id);

    return res.status(200).json(team);
  }
}

export default TeamsController;
