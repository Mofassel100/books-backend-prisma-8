import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CatagoryService } from './catagory.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CatagoryService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Catagory create Successfull',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CatagoryService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched Successfully',
    data: result,
  });
});
const getSignleDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CatagoryService.getSignelDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched Successfully',
    data: result,
  });
});
const UpdateCategoryDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await CatagoryService.UpdateCategoryDB(id, UpdateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated Successfully',
    data: result,
  });
});
export const CatagoryController = {
  insertIntoDB,
  getAllFromDB,
  getSignleDB,
  UpdateCategoryDB,
};
