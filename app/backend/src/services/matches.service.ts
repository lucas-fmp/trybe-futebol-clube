import CustomError from '../exceptions/error.exception';
import Matches from '../database/models/MatchesModel';

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
}
