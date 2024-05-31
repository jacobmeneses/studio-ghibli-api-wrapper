import { Request } from 'express';

export interface IUser {
  id: number;
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
