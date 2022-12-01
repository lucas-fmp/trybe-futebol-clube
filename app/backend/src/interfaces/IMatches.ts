export interface IMatchWithoutStatus {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchWithoutStatus {
  inProgress: boolean;
}

export interface IMatchWithTeams extends IMatch {
  teamHome: {
    id: string;
    teamName: string;
  }
  teamAway: {
    id: string;
    teamName: string;
  }
}
