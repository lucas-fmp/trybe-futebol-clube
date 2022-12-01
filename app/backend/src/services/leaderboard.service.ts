import { IMatchWithTeams } from '../interfaces/IMatches';
import { createLeaderboardHome, sortLeaderboard } from '../utils/leaderboard.util';
import Team from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';

export default class LeaderboardService {
  public static async getLeaderboardHome() {
    const matches = await Matches.findAll({
      raw: true,
      nest: true,
      include: { all: true },
      where: { inProgress: false },
    });

    const teams = await Team.findAll({
      raw: true,
    });

    const leaderboard = createLeaderboardHome(teams, matches as unknown as IMatchWithTeams[]);

    const sortedLeaderboard = sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }
}
