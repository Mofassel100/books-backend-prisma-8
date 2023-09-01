import express from 'express';
import { CatagoryController } from './catagory.controller';
const router = express.Router();
router.post('/create-category', CatagoryController.insertIntoDB);
export const CatagoryRouter = router;
