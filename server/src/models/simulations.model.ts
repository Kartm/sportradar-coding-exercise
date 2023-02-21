import { SIMULATION_DEFAULT_TICKS } from '@/config/simulation.config';
import { Simulation } from '@/interfaces/simulations.interface';

const simulationsModel: Simulation[] = [
  {
    id: 1,
    teamResults: [
      { team: 'Germany', score: 0 },
      { team: 'Poland', score: 0 },
    ],
    inProgress: false,
    ticksLeft: SIMULATION_DEFAULT_TICKS,
  },
  {
    id: 2,
    teamResults: [
      { team: 'Brazil', score: 0 },
      { team: 'Mexico', score: 0 },
    ],
    inProgress: false,
    ticksLeft: SIMULATION_DEFAULT_TICKS,
  },
  {
    id: 3,
    teamResults: [
      { team: 'Argentina', score: 0 },
      { team: 'Uruguay', score: 0 },
    ],
    inProgress: false,
    ticksLeft: SIMULATION_DEFAULT_TICKS,
  },
];

export default simulationsModel;
