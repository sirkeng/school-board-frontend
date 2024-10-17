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

export interface AwardItem {
  id: number;
  title: string;
  description: string;
}

export interface SeasonSportItem {
  id: number | null;
  bannerTitle: string;
  bannerImageUrl: string | null;
  coachName: string;
  coachDescription: string;
  coachProfileImageUrl: string | null;
  recentGameTitle: string;
  recentGameDescription: string;
  seasonNumber: string;
  seasonDetail: string;
  seasonImageUrl: string | null;
  awards: AwardItem[];
}

export interface SeasonSportItemForm {
  id: number | null;
  bannerTitle: string;
  bannerImage: File | null;
  coachName: string;
  coachDescription: string;
  coachProfileImage: File | null;
  recentGameTitle: string;
  recentGameDescription: string;
  seasonNumber: string;
  seasonDetail: string;
  seasonImage: File | null;
}
