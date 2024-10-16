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

export interface SeasonSportItem {
  id: number | null;
  bannerTitle: string;
  bannerImageUrl: File | string | null;
  coachName: string;
  coachDescription: string;
  coachProfileImageUrl: File | string | null;
  recentGameTitle: string;
  recentGameDescription: string;
  seasonNumber: string;
  seasonDetail: string;
  seasonImageUrl: File | string | null;
}
