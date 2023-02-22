export interface TeamResult {
  team: string;
  score: number;
}

export interface Simulation {
  id: number;
  teamResults: TeamResult[];
  inProgress: boolean;
  ticksLeft: number;
  ticksEverySeconds: number;
}
