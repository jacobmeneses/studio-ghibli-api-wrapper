import { Router } from 'express';
import { router as userRouter } from './user';

export class AppRouter {
  path: string;
  router: Router;

  public constructor(path: string, router: Router) {
    this.path = path;
    this.router = router;
  }
};

export const routers = [ 
  new AppRouter('/users', userRouter),
];
