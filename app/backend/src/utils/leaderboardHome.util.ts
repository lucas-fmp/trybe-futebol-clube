import { ITeam } from '../interfaces/ITeams';
import { ILeaderboardObj } from '../interfaces/ILeaderboard';
import { IMatchWithTeams } from '../interfaces/IMatches';

const totalPointsHome = (matches: IMatchWithTeams[]) => {
  let points = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      points += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      points += 1;
    }
  });

  return points;
};

const totalGamesHome = (matches: IMatchWithTeams[]) => matches.length;

const totalVictoriesHome = (matches: IMatchWithTeams[]) => {
  let victories = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      victories += 1;
    }
  });

  return victories;
};

const totalDrawsHome = (matches: IMatchWithTeams[]) => {
  let draws = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });

  return draws;
};

const totalLossesHome = (matches: IMatchWithTeams[]) => {
  let losses = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });

  return losses;
};

const goalsFavorHome = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.homeTeamGoals;
  });

  return goals;
};

const goalsOwnHome = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.awayTeamGoals;
  });

  return goals;
};

const goalsBalanceHome = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    const goalsBalanceMatch = match.homeTeamGoals - match.awayTeamGoals;
    goals += goalsBalanceMatch;
  });

  return goals;
};

const efficiencyHome = (matches: IMatchWithTeams[]) => {
  const points = totalPointsHome(matches);
  const games = totalGamesHome(matches);

  const result = ((points / (games * 3)) * 100).toFixed(2).toString();

  return result;
};

const createLeaderboardHome = (teams: ITeam[], matches: IMatchWithTeams[]) => {
  const leaderboard: ILeaderboardObj[] = [];

  teams.forEach((team) => {
    const { teamName } = team;
    const filteredMatches = matches.filter((match) => match.teamHome.teamName === teamName);
    leaderboard.push({
      name: teamName,
      totalPoints: totalPointsHome(filteredMatches),
      totalGames: totalGamesHome(filteredMatches),
      totalVictories: totalVictoriesHome(filteredMatches),
      totalDraws: totalDrawsHome(filteredMatches),
      totalLosses: totalLossesHome(filteredMatches),
      goalsFavor: goalsFavorHome(filteredMatches),
      goalsOwn: goalsOwnHome(filteredMatches),
      goalsBalance: goalsBalanceHome(filteredMatches),
      efficiency: efficiencyHome(filteredMatches),
    });
  });

  return leaderboard;
};

export default createLeaderboardHome;

export {
  totalPointsHome,
  totalGamesHome,
  totalVictoriesHome,
  totalDrawsHome,
  totalLossesHome,
  goalsFavorHome,
  goalsOwnHome,
  goalsBalanceHome,
};
