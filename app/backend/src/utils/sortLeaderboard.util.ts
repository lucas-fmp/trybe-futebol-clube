import { ILeaderboardObj } from '../interfaces/ILeaderboard';

const sortLeaderboard = (leaderboard: ILeaderboardObj[]): ILeaderboardObj[] => {
  const sortedLeaderboard = leaderboard
    .sort((b, a) => (
      a.totalPoints - b.totalPoints
      || a.totalVictories - b.totalVictories
      || a.goalsBalance - b.goalsBalance
      || a.goalsFavor - b.goalsFavor
      || a.goalsOwn - b.goalsOwn
    ));

  return sortedLeaderboard;
};

export default sortLeaderboard;
