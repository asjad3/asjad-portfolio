export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubApiResponse {
  data: GitHubContributionCalendar;
  error?: string;
}
