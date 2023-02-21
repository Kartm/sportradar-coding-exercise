import { CreateSimulationDto } from '@/dtos/simulations.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Simulation } from '@/interfaces/simulations.interface';
import simulationsModel from '@/models/simulations.model';
import { CronJob } from 'cron';

const SIMULATION_TICK_SECONDS = 10;

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class SimulationsService {
  public simulations = simulationsModel;
  private jobs = new Map<number, CronJob>();

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
    const findSimulation = this.simulations.find(s => s.id === simulationId);
    if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");

    findSimulation.inProgress = true;

    if (this.jobs.has(simulationId)) {
      // reuse existing CRON job. reset
      findSimulation.ticksLeft = 9;
      findSimulation.results.forEach(r => {
        r.score = 0;
      });
    } else {
      const newJob = new CronJob('* * * * * *', () => {
        if (findSimulation.ticksLeft === 0) {
          findSimulation.inProgress = false;
          newJob.stop();
          return;
        }

        findSimulation.results[randomIntFromInterval(0, findSimulation.results.length - 1)].score++;

        console.log(findSimulation);

        findSimulation.ticksLeft--;
      });

      this.jobs.set(simulationId, newJob);
    }

    const job = this.jobs.get(simulationId);

    job.start();

    return findSimulation;
  }

  // public async pauseSimulationById(simulationId: number): Promise<Simulation> {
  //   const findSimulation = this.simulations.find(s => s.id === simulationId);
  //   if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");
  //   return findSimulation;
  // }

  // public async stopSimulationById(simulationId: number): Promise<Simulation> {
  //   const findSimulation = this.simulations.find(s => s.id === simulationId);
  //   if (!findSimulation) throw new HttpException(409, "Simulation doesn't exist");
  //   return findSimulation;
  // }
}

export default SimulationsService;
