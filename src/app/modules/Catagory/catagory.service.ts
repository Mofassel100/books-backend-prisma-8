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
export const CatagoryService = {
  insertIntoDB,
  getAllFromDB,
};
