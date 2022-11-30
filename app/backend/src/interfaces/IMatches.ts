export interface IMatchWithoutStatus {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchWithoutStatus {
  inProgress: boolean;
}
