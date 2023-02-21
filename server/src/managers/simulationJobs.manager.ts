import { SIMULATION_TICK_EVERY_SECONDS } from '@/config/simulation.config';
import { Simulation } from '@/interfaces/simulations.interface';
import { randomIntFromInterval } from '@/utils/util';
import { CronJob } from 'cron';

class SimulationJobsManager {
  private jobs = new Map<number, CronJob>();

  public async getOrCreateJob(simulation: Simulation) {
    if (!this.jobs.has(simulation.id)) {
      const newJob = new CronJob(`*/${SIMULATION_TICK_EVERY_SECONDS} * * * * *`, () => {
        if (simulation.ticksLeft === 0) {
          simulation.inProgress = false;
          newJob.stop();
          return;
        }

        if (simulation.inProgress) {
          simulation.teamResults[randomIntFromInterval(0, simulation.teamResults.length - 1)].score++;

          console.log(simulation);

          simulation.ticksLeft--;
        }
      });

      this.jobs.set(simulation.id, newJob);
    }

    return this.jobs.get(simulation.id);
  }
}

export default SimulationJobsManager;
