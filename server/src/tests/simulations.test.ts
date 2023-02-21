import App from '@/app';
import { User } from '@/interfaces/users.interface';
import userModel from '@/models/users.model';
import UsersRoute from '@/routes/users.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Simulations', () => {
  describe('[POST] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const findUser: User[] = userModel;
      const usersRoute = new UsersRoute();
      const app = new App([usersRoute]);

      return request(app.getServer()).get(`${usersRoute.path}`).expect(200, { data: findUser, message: 'findAll' });
    });
  });
});
