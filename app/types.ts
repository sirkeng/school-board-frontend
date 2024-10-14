export interface NewsItem {
  id: number;
  title: string;
  content: string;
  location: string;
  timestamp: string;
}

export interface ScoreboardItem {
  id: number;
  sportName: string;
  firstTeam: string;
  secondTeam: string;
  firstTeamScore: number;
  secondTeamScore: number;
  liveLink: string;
}
