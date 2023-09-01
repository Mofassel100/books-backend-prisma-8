import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfull',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All User Successfull',
    data: result,
  });
});
const getSignleFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSignleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get All User Successfull',
    data: result,
  });
});
const UpdateSignleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await UserService.UpdateSignleUser(id, UpdateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update User Successfull',
    data: result,
  });
});
export const UserController = {
  insertIntoDB,
  getAllFromDB,
  UpdateSignleUser,
  getSignleFromDB,
};
