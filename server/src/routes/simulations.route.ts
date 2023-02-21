import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import SimulationsController from '@/controllers/simulations.controller';
import { CreateSimulationDto } from '@/dtos/simulations.dto';

class SimulationRoute implements Routes {
  public path = '/simulations';
  public router = Router();
  public simulationsController = new SimulationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.simulationsController.getSimulationById);
    this.router.post(
      `${this.path}/:id(\\d+)/start`,
      validationMiddleware(CreateSimulationDto, 'body'),
      this.simulationsController.startSimulationById,
    );
    this.router.post(
      `${this.path}/:id(\\d+)/finish`,
      validationMiddleware(CreateSimulationDto, 'body'),
      this.simulationsController.finishSimulationById,
    );
  }
}

export default SimulationRoute;
