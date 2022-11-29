import CustomError from '../exceptions/error.exception';
import Teams from '../database/models/TeamModel';

export default class TeamsService {
  public static async getTeams() {
    const teams = await Teams.findAll();

    return teams;
  }

  public static async getTeamById(id: string) {
    const team = await Teams.findOne({ where: { id } });

    if (!team) {
      throw new CustomError(404, 'Team not found');
    }

    return team;
  }
}
