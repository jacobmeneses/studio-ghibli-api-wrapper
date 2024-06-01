import { Router, Request } from 'express';
import prisma from '../prisma-client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, getUserRoleEnum } from '../types';
import { JwtSecret, JwtExpiresIn, AdminRole } from '../constants';
import { authJWT, authJWTByRoles } from '../middleware/auth';

export const router = Router();
const authAdmin = authJWTByRoles([ AdminRole ])

router.get('/', authAdmin, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

interface UserRegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    role: string;
  }
};

router.post('/', authAdmin, async (req: UserRegisterRequest, res) => {
  const { email, password, role } = req.body;
  const roleEnum = await getUserRoleEnum(role);

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if ( user ) {
    res.status(409).send({ message: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: roleEnum,
    }
  });

  res.status(201).send({ message: 'User created' });
});

interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  }
};

router.post('/login', async (req: UserLoginRequest, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password);

  if ( !samePassword ) {
      return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({
    id: user.id,
    role: user.role as string,
  }, JwtSecret, { expiresIn: JwtExpiresIn });

  res.json({ token });
});

