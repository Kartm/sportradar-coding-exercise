import { NextFunction, Request, Response } from 'express';
import SimulationsService from '@services/simulations.service';
import { CreateSimulationDto } from '@/dtos/simulations.dto';
import { Simulation } from '@/interfaces/simulations.interface';

class SimulationsController {
  public simulationsService = new SimulationsService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const simulationData: CreateSimulationDto = req.body;
      const createSimulationData: Simulation = await this.simulationsService.createSimulation(simulationData);

      res.status(201).json({ data: createSimulationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default SimulationsController;
