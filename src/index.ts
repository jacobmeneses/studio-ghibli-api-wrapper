import express, { Request, Response, NextFunction } from 'express';
import prisma from './prisma-client';
import { routers, AppRouter } from './controllers';
import passport from './passport';
import cors from 'cors';
import { isDevEnv, DefaultApiPort } from './constants';

const app = express();
const PORT = process.env.PORT || DefaultApiPort;

const corsOptions = {
  origin: '*',
	methods: 'GET,POST,PUT,DELETE',
};

const _cors = cors(isDevEnv ? corsOptions : {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,POST,PUT,DELETE',
})

app.use(_cors);
app.use(passport.initialize());
app.use(express.json());

routers.forEach((route: AppRouter) => {
  app.use('/api/v1' + route.path, route.router);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
