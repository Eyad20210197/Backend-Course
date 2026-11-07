import cookieParser from 'cookie-parser';
import express from 'express';
import connectToDatabase from './common/db/connection.js';
import errorHandler from './common/errors/errorHandler.js';
import usersRouter from './app/users/users.route.js';
import authRouter from './app/auth/auth.route.js';
import messagesRouter from './app/messages/messages.route.js';
import identityRequestsRouter from './app/identity-requests/identity-requests.route.js';
import conversationsRouter from './app/conversations/conversations.route.js';

const bootstrap = async () => {
  const app = express();

  // Global middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Database
  await connectToDatabase();

  // Routes
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/messages', messagesRouter);
  app.use('/identity-requests', identityRequestsRouter);
  app.use('/conversations', conversationsRouter);

  app.use(errorHandler);
  return app;
};

export default bootstrap;
