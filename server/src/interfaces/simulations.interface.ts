export interface TeamResult {
  team: string;
  score: number;
}

export interface Simulation {
  id: number;
  results: TeamResult[];
}
