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

export interface SportItem {
  id: number;
  sportName: string;
  imageUrl: string;
}

export interface SeasonItem {
  id: number;
  seasonName: string;
  sports: SportItem[];
}
