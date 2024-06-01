import { Router, Request } from 'express';
import prisma from '../prisma-client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser, getUserRoleEnum } from '../types';
import { JwtSecret, JwtExpiresIn, AdminRole } from '../constants';
import { authJWT, authJWTByRoles } from '../middleware/auth';

export const router = Router();

type FlexibleType  = {
  [key: string]: any 
};

const authAdmin = authJWTByRoles([ AdminRole ])
const selectUserFields = {
  id: true,
  email: true,
  role: true,
};

interface DeleteUserRequestUser {
  id: number;
}

interface DeleteUserRequest extends Request {
  body: {
    users: Array<DeleteUserRequestUser>;
  }
}

router.delete('/', authAdmin, async (req: DeleteUserRequest, res) => {
  const { users } = req.body;

  if ( !users || users.length === 0 ) {
    res.status(400).send({ message: 'No users provided' });
    return;
  }

  const ids = users.map(user => user.id);

  await prisma.user.deleteMany({
    where: {
      id: {
        in: ids,
      }
    }
  });

  res.send({ message: 'Users deleted' });
});

interface EditUserRequest extends Request {
  params: {
    id: string;
  },
  body: {
    email: string;
    role: string;
    password: string;
  }
};

router.put('/:id', authAdmin, async (req: EditUserRequest, res) => {
  const id = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });

  if ( !user ) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  let data : FlexibleType = {};

  const transform : FlexibleType = {
    role: async (value: any) : Promise<any> => {
      const roleEnum = await getUserRoleEnum(value);

      return roleEnum;
    },
    password: async (value: any) : Promise<any> => {
      const hashedPassword = await bcrypt.hash(value, 10);
      return hashedPassword;
    }
  };
  const keys = Object.keys(req.body);

  for ( let i = 0; i < keys.length; i++ ) {
    const key = keys[i] as keyof EditUserRequest['body'];

    if ( key in transform ) {
      data[key] = await transform[key](req.body[key]);
    } else {
      data[key] = req.body[key];
    }
  }

  if ( Object.keys(data).length === 0 ) {
    res.status(400).send({ message: 'No data provided' });
    return;
  }

  await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  res.send({ message: 'User updated' });
});


interface GetUserRequest extends Request {
  params: {
    id: string;
  }
};

router.get('/:id', authAdmin, async (req: GetUserRequest, res) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: selectUserFields,
  });

  if ( !user ) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  res.json(user);
});

router.get('/', authAdmin, async (req, res) => {
  const users = await prisma.user.findMany({
    select: selectUserFields,
  });
  res.json({ users });
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

