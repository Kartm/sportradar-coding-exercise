import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import SimulationRoute from '@/routes/simulations.route';

validateEnv();

const app = new App([new IndexRoute(), new SimulationRoute()]);

app.listen();
