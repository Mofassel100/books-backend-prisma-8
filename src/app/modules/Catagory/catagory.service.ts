import { Catagory } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: Catagory): Promise<Catagory> => {
  const result = await prisma.catagory.create({
    data,
  });
  return result;
};
const getAllFromDB = async () => {
  const result = await prisma.catagory.findMany({});
  return result;
};
const getSignelDB = async (id: string) => {
  const result = await prisma.catagory.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateCategoryDB = async (
  id: string,
  payload: Partial<Catagory>
): Promise<Catagory> => {
  const result = await prisma.catagory.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
export const CatagoryService = {
  insertIntoDB,
  getAllFromDB,
  getSignelDB,
  UpdateCategoryDB,
};
