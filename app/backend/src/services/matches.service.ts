import { IMatchWithoutStatus } from '../interfaces/IMatches';
import CustomError from '../exceptions/error.exception';
import Matches from '../database/models/MatchesModel';
import sequelize from '../database/models';
import Team from '../database/models/TeamModel';

export default class MatchesService {
  public static async getMatches() {
    const matches = await Matches.findAll({ include: { all: true } });

    if (!matches || matches.length === 0) {
      throw new CustomError(404, 'No matches found');
    }

    return matches;
  }

  public static async getInProgressOrFinishedMatches(inProgress: string) {
    if (inProgress === 'true') {
      const matches = await Matches.findAll({
        include: { all: true },
        where: { inProgress: true },
      });

      return matches;
    }
    if (inProgress === 'false') {
      const matches = await Matches.findAll({
        include: { all: true },
        where: { inProgress: false },
      });

      return matches;
    }
    throw new CustomError(404, 'No matches found');
  }

  public static async newMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IMatchWithoutStatus) {
    if (homeTeam === awayTeam) {
      throw new CustomError(422, 'It is not possible to create a match with two equal teams');
    }

    const teams = await Team.findAll({ where: { id: [homeTeam, awayTeam] } });
    if (!teams || teams.length !== 2) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const result = await sequelize.transaction(async (t) => {
      const { dataValues } = await Matches.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true }, { transaction: t });

      return dataValues;
    });

    return result;
  }

  public static async updateMatch(id: string) {
    const match = await Matches.findOne({ where: { id } });

    if (!match) {
      throw new CustomError(404, 'Match not found');
    }

    await match.update({ inProgress: false });
  }
}
