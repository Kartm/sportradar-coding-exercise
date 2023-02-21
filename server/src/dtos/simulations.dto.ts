// these models could be more "granular", but I'm leaving them for simplicity sake
export class CreateTeamResultDto {
  team: string;
}

export class CreateSimulationDto {
  teamResults: CreateTeamResultDto[];
}

export interface GetTeamResultDto {
  team: string;
  score: number;
}

export class GetSimulationDto {
  id: number;
  teamResults: GetTeamResultDto[];
}
