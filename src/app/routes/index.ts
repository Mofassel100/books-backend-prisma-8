import express from 'express';
import { CatagoryRouter } from '../modules/Catagory/catagory.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BookRouter } from '../modules/books/books.routes';
import { OrderRouter } from '../modules/order/order.routes';
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
  {
    path: '/categories',
    routes: CatagoryRouter,
  },
  {
    path: '/books',
    routes: BookRouter,
  },
  {
    path: '/orders',
    routes: OrderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
