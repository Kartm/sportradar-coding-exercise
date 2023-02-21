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
    this.router.post(`${this.path}`, validationMiddleware(CreateSimulationDto, 'body'), this.simulationsController.create);
  }
}

export default SimulationRoute;
