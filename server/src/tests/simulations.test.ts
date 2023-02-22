import App from '@/app';
import { CreateSimulationDto } from '@/dtos/simulations.dto';
import userModel from '@/models/users.model';
import SimulationRoute from '@/routes/simulations.route';
import UsersRoute from '@/routes/users.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

let SIMULATION_ID: number;
describe('Simulation is', () => {
  it('created', () => {
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

    return newSimulationResponse
      .expect(201, {
        data: {
          id: 4,
          teamResults: [
            { team: 'Poland', score: 0 },
            { team: 'Germany', score: 0 },
          ],
          inProgress: false,
          ticksLeft: 2,
          ticksEverySeconds: 1,
        },
        message: 'created',
      })
      .then(res => {
        SIMULATION_ID = res.body.id;
      });
    //
    // const getSimulationStatusResponse = request(app.getServer())
    //   .get(`${simulationRoute.path}/4`)
    // return getSimulationStatusResponse.expect(201, {
    //   data: {
    //     id: 4,
    //     teamResults: [
    //       { team: 'Poland', score: 0 },
    //       { team: 'Germany', score: 0 },
    //     ],
    //   },
    //   message: 'created',
    // });

    // const startSimulationResponse =

    // return request(app.getServer()).get(`${simulationRoute.path}`).expect(200, { data: findUser, message: 'findAll' });
  });
});
