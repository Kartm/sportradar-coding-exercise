import { SIMULATION_DEFAULT_TICKS } from '@/config/simulation.config';
import { CreateSimulationDto, GetSimulationDto } from '@/dtos/simulations.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Simulation } from '@/interfaces/simulations.interface';
import JobsManager from '@/managers/simulationJobs.manager';
import simulationsModel from '@/models/simulations.model';
import { clone, isEmpty } from '@/utils/util';

class SimulationsService {
  public simulations = simulationsModel;
  private jobsManager = new JobsManager();

  public async createSimulation(simulationData: CreateSimulationDto): Promise<GetSimulationDto> {
    if (isEmpty(simulationData)) throw new HttpException(400, 'simulationData is empty');

    const createSimulationData: Simulation = {
      id: this.simulations.length + 1,
      teamResults: simulationData.teams.map(team => ({ ...team, score: 0 })),
      inProgress: false,
      ticksLeft: SIMULATION_DEFAULT_TICKS,
    };
    this.simulations = [...this.simulations, createSimulationData];

    return createSimulationData;
  }

  public async findSimulationById(simulationId: number): Promise<Simulation> {
    const findSimulation = this.simulations.find(s => s.id === simulationId);
    if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");
    return findSimulation;
  }

  public async updateSimulationById(simulationId: number, simulationData: Simulation): Promise<Simulation> {
    const findSimulationIndex = this.simulations.findIndex(s => s.id === simulationId);
    if (findSimulationIndex === -1) throw new HttpException(409, "Simulation doesn't exist");

    this.simulations[findSimulationIndex] = simulationData;
    return simulationData;
  }

  public async startSimulationById(simulationId: number): Promise<Simulation> {
    let findSimulation = this.simulations.find(s => s.id === simulationId);
    if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");

    findSimulation = await this.updateSimulationById(simulationId, this.resetSimulation(findSimulation));

    const job = await this.jobsManager.getOrCreateJob(findSimulation);

    job.start();

    return findSimulation;
  }

  public async finishSimulationById(simulationId: number): Promise<Simulation> {
    const findSimulation = this.simulations.find(s => s.id === simulationId);
    if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");

    findSimulation.inProgress = false;

    return findSimulation;
  }

  private resetSimulation(simulation: Simulation) {
    const newSimulation = clone(simulation);

    newSimulation.inProgress = true;
    newSimulation.ticksLeft = SIMULATION_DEFAULT_TICKS;
    newSimulation.teamResults.forEach(r => {
      r.score = 0;
    });

    return newSimulation;
  }
}

export default SimulationsService;
