import { User } from '@prisma/client';
import { prisma } from '../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};
// getAllData
const getAllFromDB = async () => {
  const result = await prisma.user.findMany({});
  return result;
};
// getAllData
const UpdateSignleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
export const UserService = {
  insertIntoDB,
  getAllFromDB,
  UpdateSignleUser,
};
