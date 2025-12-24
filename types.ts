
export interface GenreData {
  name: string;
  percentage: number;
}

export interface MoodMetric {
  label: string;
  value: number; // 0 to 100
}

export interface AnalysisResult {
  classification: string;
  summary: string;
  genres: GenreData[];
  moods: MoodMetric[];
  vibeKeywords: string[];
  complexityScore: number;
  uniquenessScore: number;
}

export interface TrackData {
  artistName?: string;
  trackName?: string;
  endTime?: string;
  msPlayed?: number;
}
