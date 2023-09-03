import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const getUserProfile = async (user: string): Promise<Partial<User>> => {
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is missing');
  }
  const result = await prisma.user.findUnique({
    where: {
      id: user,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User retrieved failed');
  }
  return result;
};
export const ProfileService = {
  getUserProfile,
};
