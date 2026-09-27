import cookieParser from 'cookie-parser';
import express from 'express';
import connectToDatabase from './common/db/connection.js';
import usersRouter from './app/users/users.route.js';
import authRouter from './app/auth/auth.route.js';

const bootstrap = async () => {
  const app = express();

  // Global middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Database
  await connectToDatabase();

  //Routes
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);

  return app;
};

export default bootstrap;