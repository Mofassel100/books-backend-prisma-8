import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getUserProfile(req.user as Partial<User>);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfull',
    data: result,
  });
});
export const ProfileController = {
  getAllData,
};
