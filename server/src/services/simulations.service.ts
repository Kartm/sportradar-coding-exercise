import { SIMULATION_DEFAULT_TICKS } from '@/config/simulation.config';
import { HttpException } from '@/exceptions/HttpException';
import { Simulation } from '@/interfaces/simulations.interface';
import JobsManager from '@/managers/simulationJobs.manager';
import simulationsModel from '@/models/simulations.model';
import { clone } from '@/utils/util';

class SimulationsService {
  public simulations = simulationsModel;
  private jobsManager = new JobsManager();

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
    newSimulation.results.forEach(r => {
      r.score = 0;
    });

    return newSimulation;
  }
}

export default SimulationsService;
