import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Order, User } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId;
  const OrderData = req.body;
  console.log(OrderData, id);
  const result = await OrderService.insertIntoDB(id, OrderData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Order successfully',
    data: result,
  });
});

const getOrderFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrderFromDB(req.user as Partial<User>);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched all  successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user?.userId;
  const role = req.user?.role;

  const result = await OrderService.getSingleOrder(userId, role, id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});
export const OrderController = {
  insertIntoDB,
  getOrderFromDB,
  getSingleOrder,
};
