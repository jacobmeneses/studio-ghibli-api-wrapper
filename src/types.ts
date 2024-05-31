import { Request } from 'express';
import { Role } from '@prisma/client'

export interface IUser {
  id: number;
  role: string;
}

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export async function getUserRoleEnum(roleString: string): Promise<Role | undefined> {
  // Check if the string matches any of the enum values
  if (Object.values(Role).includes(roleString as Role)) {
    return roleString as Role;
  }

  // Return null or handle the error as needed
  return undefined;
}
