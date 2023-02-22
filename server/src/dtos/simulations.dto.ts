import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

// these models could be more "granular", but I'm leaving them for simplicity sake
export class CreateTeamResultDto {
  @IsNotEmpty()
  team: string;
}

export class CreateSimulationDto {
  @ArrayNotEmpty()
  teams: CreateTeamResultDto[];
}

export interface GetTeamResultDto {
  team: string;
  score: number;
}

export class GetSimulationDto {
  id: number;
  teamResults: GetTeamResultDto[];
}
