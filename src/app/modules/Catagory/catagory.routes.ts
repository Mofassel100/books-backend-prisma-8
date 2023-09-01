import express from 'express';
import { CatagoryController } from './catagory.controller';
const router = express.Router();
router.post('/create-category', CatagoryController.insertIntoDB);
router.get('/', CatagoryController.getAllFromDB);
export const CatagoryRouter = router;
