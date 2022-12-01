import { ITeam } from '../interfaces/ITeams';
import { ILeaderboardObj } from '../interfaces/ILeaderboard';
import { IMatchWithTeams } from '../interfaces/IMatches';
import {
  goalsBalanceAway,
  goalsFavorAway,
  goalsOwnAway,
  totalDrawsAway,
  totalGamesAway,
  totalLossesAway,
  totalPointsAway,
  totalVictoriesAway,
} from './leaderboardAway.util';
import {
  goalsBalanceHome,
  goalsFavorHome,
  goalsOwnHome,
  totalDrawsHome,
  totalGamesHome,
  totalLossesHome,
  totalPointsHome,
  totalVictoriesHome,
} from './leaderboardHome.util';

const efficiency = (filteredAway: IMatchWithTeams[], filteredHome: IMatchWithTeams[]) => {
  const points = totalPointsAway(filteredAway) + totalPointsHome(filteredHome);
  const games = totalGamesAway(filteredAway) + totalGamesHome(filteredHome);

  const result = ((points / (games * 3)) * 100).toFixed(2).toString();

  return result;
};

const createLeaderboard = (teams: ITeam[], matches: IMatchWithTeams[]) => {
  const leaderboard: ILeaderboardObj[] = [];

  teams.forEach((team) => {
    const filteredAway = matches.filter((match) => match.teamAway.teamName === team.teamName);
    const filteredHome = matches.filter((match) => match.teamHome.teamName === team.teamName);
    leaderboard.push({
      name: team.teamName,
      totalPoints: totalPointsAway(filteredAway) + totalPointsHome(filteredHome),
      totalGames: totalGamesAway(filteredAway) + totalGamesHome(filteredHome),
      totalVictories: totalVictoriesAway(filteredAway) + totalVictoriesHome(filteredHome),
      totalDraws: totalDrawsAway(filteredAway) + totalDrawsHome(filteredHome),
      totalLosses: totalLossesAway(filteredAway) + totalLossesHome(filteredHome),
      goalsFavor: goalsFavorAway(filteredAway) + goalsFavorHome(filteredHome),
      goalsOwn: goalsOwnAway(filteredAway) + goalsOwnHome(filteredHome),
      goalsBalance: goalsBalanceAway(filteredAway) + goalsBalanceHome(filteredHome),
      efficiency: efficiency(filteredAway, filteredHome),
    });
  });

  return leaderboard;
};

export default createLeaderboard;
