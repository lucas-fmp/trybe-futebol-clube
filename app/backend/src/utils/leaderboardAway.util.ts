import { ITeam } from '../interfaces/ITeams';
import { ILeaderboardObj } from '../interfaces/ILeaderboard';
import { IMatchWithTeams } from '../interfaces/IMatches';

const totalPointsAway = (matches: IMatchWithTeams[]) => {
  let points = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      points += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      points += 1;
    }
  });

  return points;
};

const totalGamesAway = (matches: IMatchWithTeams[]) => matches.length;

const totalVictoriesAway = (matches: IMatchWithTeams[]) => {
  let victories = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      victories += 1;
    }
  });

  return victories;
};

const totalDrawsAway = (matches: IMatchWithTeams[]) => {
  let draws = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });

  return draws;
};

const totalLossesAway = (matches: IMatchWithTeams[]) => {
  let losses = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals < match.homeTeamGoals) {
      losses += 1;
    }
  });

  return losses;
};

const goalsFavorAway = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.awayTeamGoals;
  });

  return goals;
};

const goalsOwnAway = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.homeTeamGoals;
  });

  return goals;
};

const goalsBalanceAway = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    const goalsBalanceMatch = match.awayTeamGoals - match.homeTeamGoals;
    goals += goalsBalanceMatch;
  });

  return goals;
};

const efficiencyAway = (matches: IMatchWithTeams[]) => {
  const points = totalPointsAway(matches);
  const games = totalGamesAway(matches);

  const result = ((points / (games * 3)) * 100).toFixed(2).toString();

  return result;
};

const createLeaderboardAway = (teams: ITeam[], matches: IMatchWithTeams[]) => {
  const leaderboard: ILeaderboardObj[] = [];

  teams.forEach((team) => {
    const { teamName } = team;
    const filteredMatches = matches.filter((match) => match.teamAway.teamName === teamName);
    leaderboard.push({
      name: teamName,
      totalPoints: totalPointsAway(filteredMatches),
      totalGames: totalGamesAway(filteredMatches),
      totalVictories: totalVictoriesAway(filteredMatches),
      totalDraws: totalDrawsAway(filteredMatches),
      totalLosses: totalLossesAway(filteredMatches),
      goalsFavor: goalsFavorAway(filteredMatches),
      goalsOwn: goalsOwnAway(filteredMatches),
      goalsBalance: goalsBalanceAway(filteredMatches),
      efficiency: efficiencyAway(filteredMatches),
    });
  });

  return leaderboard;
};

export default createLeaderboardAway;

export {
  totalPointsAway,
  totalGamesAway,
  totalVictoriesAway,
  totalDrawsAway,
  totalLossesAway,
  goalsFavorAway,
  goalsOwnAway,
  goalsBalanceAway,
};
