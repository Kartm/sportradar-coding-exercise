import { Simulation } from '@/interfaces/simulations.interface';

const simulationsModel: Simulation[] = [
  {
    id: 1,
    results: [
      { team: 'Germany', score: 0 },
      { team: 'Poland', score: 0 },
    ],
    inProgress: false,
    ticksLeft: 9,
  },
  {
    id: 2,
    results: [
      { team: 'Brazil', score: 0 },
      { team: 'Mexico', score: 0 },
    ],
    inProgress: false,
    ticksLeft: 9,
  },
  {
    id: 3,
    results: [
      { team: 'Argentina', score: 0 },
      { team: 'Uruguay', score: 0 },
    ],
    inProgress: false,
    ticksLeft: 9,
  },
];

export default simulationsModel;
