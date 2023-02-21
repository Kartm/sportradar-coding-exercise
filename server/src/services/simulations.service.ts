import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateSimulationDto } from '@/dtos/simulations.dto';
import { Simulation } from '@/interfaces/simulations.interface';
import simulationsModel from '@/models/simulations.model';

class SimulationsService {
  public simulations = simulationsModel;

  public async createSimulation(simulationData: CreateSimulationDto): Promise<Simulation> {
    const createSimulationData: Simulation = {
      id: this.simulations.length + 1,
      results: [
        { team: 'Argentina', score: 0 },
        { team: 'Germany', score: 0 },
      ],
    };

    this.simulations = [...this.simulations, createSimulationData];

    return createSimulationData;
  }
}

export default SimulationsService;
