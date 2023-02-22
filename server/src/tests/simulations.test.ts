import App from '@/app';
import {CreateSimulationDto} from '@/dtos/simulations.dto';
import SimulationRoute from '@/routes/simulations.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Simulation is', () => {
  it('created, started and running', () => {
    const simulationRoute = new SimulationRoute();
    const app = new App([simulationRoute]);

    const newSimulationData: CreateSimulationDto = {
      teams: [{ team: 'Poland' }, { team: 'Germany' }],
      ticks: 2,
      ticksEverySeconds: 1,
    };

    const newSimulationResponse = request(app.getServer())
      .post(`${simulationRoute.path}`)
      .send(newSimulationData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return newSimulationResponse.expect(201, {
      data: {
        id: 4, // this test assumes there are already 3 simulations in the database
        teamResults: [
          { team: 'Poland', score: 0 },
          { team: 'Germany', score: 0 },
        ],
        inProgress: false,
        ticksLeft: 2,
        ticksEverySeconds: 1,
      },
      message: 'created',
    });
  });
});
