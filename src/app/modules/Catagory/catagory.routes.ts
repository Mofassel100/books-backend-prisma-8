import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CatagoryController } from './catagory.controller';
const router = express.Router();
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CatagoryController.insertIntoDB
);
router.get('/', CatagoryController.getAllFromDB);
router.get('/:id', CatagoryController.getSignleDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CatagoryController.UpdateCategoryDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CatagoryController.DeletedCategoryDB
);
export const CatagoryRouter = router;
