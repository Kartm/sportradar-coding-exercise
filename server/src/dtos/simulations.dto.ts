export class CreateSimulationDto {}

export interface GetTeamResultDto {
  team: string;
  score: number;
}

export class GetSimulationDto {
  id: number;
  results: GetTeamResultDto[];
}
