import { Router } from 'express';
import { router as userRouter } from './user';
import { router as ghibliRouter } from './ghibli';

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
  new AppRouter('/ghibli', ghibliRouter),
];
