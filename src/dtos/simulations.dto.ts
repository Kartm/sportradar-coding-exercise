import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

// these models could be more "granular", but I'm leaving them for simplicity sake
export class CreateTeamResultDto {
  @IsNotEmpty()
  team: string;
}

export class CreateSimulationDto {
  @ArrayNotEmpty()
  teams: CreateTeamResultDto[];

  @IsNumber()
  @IsOptional()
  ticks?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(60)
  ticksEverySeconds?: number;
}

export interface GetTeamResultDto {
  team: string;
  score: number;
}

export class GetSimulationDto {
  id: number;
  teamResults: GetTeamResultDto[];
  inProgress: boolean;
  ticksLeft: number;
}
