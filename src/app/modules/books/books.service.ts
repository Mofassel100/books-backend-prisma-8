import { Book } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

//  const {
//    page = 1,
//    size = 10,
//    sortBy = 'price',
//    sortOrder = 'asc',
//    minPrice,
//    maxPrice,
//    category,
//    search,
//  } = req.query;

//  const booksQuery = prisma.book.findMany(

//   {
//    where: {
//      AND: [
//        minPrice ? { price: { gte: parseFloat(minPrice as string) } } : {},
//        maxPrice ? { price: { lte: parseFloat(maxPrice as string) } } : {},
//        category ? { categoryId: category as string } : {},
//        search
//          ? {
//              OR: [
//                { title: { contains: search as string, mode: 'insensitive' } },
//                { author: { contains: search as string, mode: 'insensitive' } },
//                { genre: { contains: search as string, mode: 'insensitive' } },
//              ],
//            }
//          : {},
//      ],
//    },
//    orderBy: {
//      [sortBy as string]: sortOrder as 'asc' | 'desc',
//    },
//    skip: (parseInt(page as string) - 1) * parseInt(size as string),
//    take: parseInt(size as string),
//    include: {
//      category: true,
//    },
//  }
//  );

//  const totalCountQuery = prisma.book.count({
//    where: {
//      AND: [
//        minPrice ? { price: { gte: parseFloat(minPrice as string) } } : {},
//        maxPrice ? { price: { lte: parseFloat(maxPrice as string) } } : {},
//        category ? { categoryId: category as string } : {},
//        search
//          ? {
//              OR: [
//                { title: { contains: search as string, mode: 'insensitive' } },
//                { author: { contains: search as string, mode: 'insensitive' } },
//                { genre: { contains: search as string, mode: 'insensitive' } },
//              ],
//            }
//          : {},
//      ],
//    },
//  });

//  const [books, totalCount] = await Promise.all([booksQuery, totalCountQuery]);

//  res.json({ books, totalCount });

// const getAllFromDB = async (options: IPaginationOptions) => {
//   const {
//     page = 1,
//     size = 1,
//     sortBy,
//     sortOrder,
//     minPrice,
//     maxPrice,
//     category,
//     search,
//   } = options;
//   const result = await prisma.book.findMany({
//     where: {
//       AND: [
//         minPrice ? { price: { gte: minPrice } } : {},
//         maxPrice ? { price: { lte: maxPrice } } : {},
//         category ? { categoryId: category as string } : {},
//         search
//           ? {
//               OR: [
//                 { title: { contains: search as string, mode: 'insensitive' } },
//                 { author: { contains: search as string, mode: 'insensitive' } },
//                 { genre: { contains: search as string, mode: 'insensitive' } },
//               ],
//             }
//           : {},
//       ],
//     },
//     orderBy: {
//       [sortBy as string]: sortOrder as 'asc' | 'desc',
//     },
//     skip: page - 1 * size,
//     take: size,
//     include: {
//       category: true,
//     },
//   });
//   const total = await prisma.book.count({});
//   const totalPage = prisma.book.count({
//     where: {
//       AND: [
//         minPrice ? { price: { gte: minPrice } } : {},
//         maxPrice ? { price: { lte: maxPrice } } : {},
//         category ? { categoryId: category as string } : {},
//         search
//           ? {
//               OR: [
//                 { title: { contains: search as string, mode: 'insensitive' } },
//                 { author: { contains: search as string, mode: 'insensitive' } },
//                 { genre: { contains: search as string, mode: 'insensitive' } },
//               ],
//             }
//           : {},
//       ],
//     },
//   });

//   return {
//     meta: {
//       totalPage,
//       page,
//       total,
//       size,
//     },
//     data: result,
//   };
// };
const getAllFromDB = async () => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return {
    data: result,
  };
};

const getSignelDB = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const UpdateBookDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const DeletedBookDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};
export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getSignelDB,
  UpdateBookDB,
  DeletedBookDB,
};
