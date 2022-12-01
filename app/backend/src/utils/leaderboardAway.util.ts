import { ITeam } from '../interfaces/ITeams';
import { ILeaderboardObj } from '../interfaces/ILeaderboard';
import { IMatchWithTeams } from '../interfaces/IMatches';

const totalPoints = (matches: IMatchWithTeams[]) => {
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

const totalGames = (matches: IMatchWithTeams[]) => matches.length;

const totalVictories = (matches: IMatchWithTeams[]) => {
  let victories = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      victories += 1;
    }
  });

  return victories;
};

const totalDraws = (matches: IMatchWithTeams[]) => {
  let draws = 0;

  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });

  return draws;
};

const totalLosses = (matches: IMatchWithTeams[]) => {
  let losses = 0;

  matches.forEach((match) => {
    if (match.awayTeamGoals < match.homeTeamGoals) {
      losses += 1;
    }
  });

  return losses;
};

const goalsFavor = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.awayTeamGoals;
  });

  return goals;
};

const goalsOwn = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    goals += match.homeTeamGoals;
  });

  return goals;
};

const goalsBalance = (matches: IMatchWithTeams[]) => {
  let goals = 0;

  matches.forEach((match) => {
    const goalsBalanceMatch = match.awayTeamGoals - match.homeTeamGoals;
    goals += goalsBalanceMatch;
  });

  return goals;
};

const efficiency = (matches: IMatchWithTeams[]) => {
  const points = totalPoints(matches);
  const games = totalGames(matches);

  const result = (((points / (games * 3)) * 100).toFixed(2)).toString();

  return result;
};

const createLeaderboardAway = (teams: ITeam[], matches: IMatchWithTeams[]) => {
  const leaderboard: ILeaderboardObj[] = [];

  teams.forEach((team) => {
    const { teamName } = team;
    const filteredMatches = matches.filter((match) => match.teamAway.teamName === teamName);
    leaderboard.push({
      name: teamName,
      totalPoints: totalPoints(filteredMatches),
      totalGames: totalGames(filteredMatches),
      totalVictories: totalVictories(filteredMatches),
      totalDraws: totalDraws(filteredMatches),
      totalLosses: totalLosses(filteredMatches),
      goalsFavor: goalsFavor(filteredMatches),
      goalsOwn: goalsOwn(filteredMatches),
      goalsBalance: goalsBalance(filteredMatches),
      efficiency: efficiency(filteredMatches),
    });
  });

  return leaderboard;
};

export default createLeaderboardAway;
