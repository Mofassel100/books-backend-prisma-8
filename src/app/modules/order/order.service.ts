// import { IOrderBooks } from './order.interface';

import { Order, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  userId: string,
  payload: Partial<Order>
): Promise<Order | null> => {
  const { orderedBooks } = payload;

  if (orderedBooks) {
    const orderData = {
      userId: userId, // Replace with the actual user's UUID
      orderedBooks: orderedBooks,
    };

    const result = await prisma.order.create({
      data: orderData,
    });
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_GATEWAY, `Order created failed`);
  }
};

const getOrderFromDB = async (user: Partial<User>): Promise<Order[] | null> => {
  if (user.role === 'admin') {
    const result = await prisma.order.findMany({});
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'admin not fund');
    }
    return result;
  }
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({ where: { userId: user.id } });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'admin not fund');
    }
    return result;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'order Not Found');
};

const getSingleOrder = async (
  userId: string,
  role: string,
  id: string
): Promise<Order | null> => {
  let result;

  if (role === 'customer') {
    result = await prisma.order.findUnique({ where: { id, userId } });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
  }

  return result;
};

export const OrderService = {
  insertIntoDB,
  getOrderFromDB,
  getSingleOrder,
};
