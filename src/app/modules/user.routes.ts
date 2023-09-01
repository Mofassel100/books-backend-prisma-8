import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../middlewares/auth';
import { UserController } from './user.controller';
const router = express.Router();
router.post('/auth/signup', UserController.insertIntoDB);

router.get(
  '/users',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllFromDB
);
router.get(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSignleFromDB
);
router.patch(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.UpdateSignleUser
);
export const UserRouter = router;
