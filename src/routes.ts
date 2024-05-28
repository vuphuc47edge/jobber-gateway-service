import { authRoutes } from '@gateway/routes/auth';
import { currentUserRoutes } from '@gateway/routes/current-user';
import { healthRoutes } from '@gateway/routes/health';
import { searchRoutes } from '@gateway/routes/search';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { Application } from 'express';

const BASE_PATH = '/api/v1/gateway';

export const appRoutes = (app: Application): void => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
};
