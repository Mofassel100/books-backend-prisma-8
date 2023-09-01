import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRouter } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/',
    routes: UserRouter,
  },
  {
    path: '/',
    routes: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
