import { authRoutes } from '@gateway/routes/auth';
import { buyerRoutes } from '@gateway/routes/buyer';
import { currentUserRoutes } from '@gateway/routes/current-user';
import { gigRoutes } from '@gateway/routes/gig';
import { healthRoutes } from '@gateway/routes/health';
import { messageRoutes } from '@gateway/routes/message';
import { searchRoutes } from '@gateway/routes/search';
import { sellerRoutes } from '@gateway/routes/seller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import { Application } from 'express';

const BASE_PATH = '/api/v1/gateway';

export const appRoutes = (app: Application): void => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
  app.use(BASE_PATH, searchRoutes.routes());

  app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, buyerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, sellerRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, gigRoutes.routes());
  app.use(BASE_PATH, authMiddleware.verifyUser, messageRoutes.routes());
};
