import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const getUserProfile = async (user: Partial<User>): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
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
