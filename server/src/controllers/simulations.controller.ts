import { NextFunction, Request, Response } from 'express';
import SimulationsService from '@services/simulations.service';
import { CreateSimulationDto, GetSimulationDto } from '@/dtos/simulations.dto';
import { Simulation } from '@/interfaces/simulations.interface';

class SimulationsController {
  public simulationsService = new SimulationsService();

  public createSimulation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const simulationData: CreateSimulationDto = req.body;
      const createSimulationData: GetSimulationDto = await this.simulationsService.createSimulation(simulationData);

      res.status(201).json({ data: createSimulationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getSimulationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const simulationId = Number(req.params.id);
      const findOneSimulationData: GetSimulationDto = await this.simulationsService.findSimulationById(simulationId);

      res.status(200).json({ data: findOneSimulationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public startSimulationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const simulationId = Number(req.params.id);
      const simulationData: Simulation = await this.simulationsService.startSimulationById(simulationId);

      res.status(200).json({ data: simulationData, message: 'started' });
    } catch (error) {
      next(error);
    }
  };

  public finishSimulationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const simulationId = Number(req.params.id);
      const simulationData: Simulation = await this.simulationsService.finishSimulationById(simulationId);

      res.status(200).json({ data: simulationData, message: 'finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default SimulationsController;
