import { IMatchWithTeams } from '../interfaces/IMatches';
import createLeaderboardHome from '../utils/leaderboardHome.util';
import Team from '../database/models/TeamModel';
import Matches from '../database/models/MatchesModel';
import sortLeaderboard from '../utils/sortLeaderboard.util';
import createLeaderboardAway from '../utils/leaderboardAway.util';
import createLeaderboard from '../utils/leaderboard.util';

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

  public static async getLeaderboardAway() {
    const matches = await Matches.findAll({
      raw: true,
      nest: true,
      include: { all: true },
      where: { inProgress: false },
    });

    const teams = await Team.findAll({
      raw: true,
    });

    const leaderboard = createLeaderboardAway(teams, matches as unknown as IMatchWithTeams[]);

    const sortedLeaderboard = sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }

  public static async getLeaderboard() {
    const matches = await Matches.findAll({
      raw: true,
      nest: true,
      include: { all: true },
      where: { inProgress: false },
    });

    const teams = await Team.findAll({
      raw: true,
    });

    const leaderboard = createLeaderboard(teams, matches as unknown as IMatchWithTeams[]);

    const sortedLeaderboard = sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }
}
