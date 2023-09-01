import express from 'express';
import { CatagoryController } from './catagory.controller';
const router = express.Router();
router.post('/create-category', CatagoryController.insertIntoDB);
router.get('/', CatagoryController.getAllFromDB);
router.get('/:id', CatagoryController.getSignleDB);
router.patch('/:id', CatagoryController.UpdateCategoryDB);
export const CatagoryRouter = router;
