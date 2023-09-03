import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  BookRelationalFields,
  BookRelationalFieldsMapper,
  BookSearchableFields,
} from './book.constant';
import { IBookFilterRequest } from './book.interface';

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
// ? {
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
const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  console.log(search);
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BookRelationalFields.includes(key)) {
          return {
            [BookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
  // Build the Prisma query based on the query parameters
  // const where = {
  //   AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
  // };

  // if (category) {
  //   where.AND.push({ categoryId: category });
  // }

  // if (search) {
  //   where.AND.push({
  //     OR: [
  //       { title: { contains: search, mode: 'insensitive' } },
  //       { author: { contains: search, mode: 'insensitive' } },
  //       { genre: { contains: search, mode: 'insensitive' } },
  //     ],
  //   });
  // }

  // const books = await prisma.book.findMany({
  //   where,
  //   orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
  //   skip: (page - 1) * size,
  //   take: size,
  // });

  // const total = await prisma.book.count({ where });

  // // Calculate total pages
  // const totalPage = Math.ceil(total / size);

  // // const result = await prisma.book.findMany({
  // //   include: {
  // //     category: true,
  // //   },
  // // });
  // return {
  //   meta: {
  //     page,
  //     size,
  //     total,
  //     totalPage,
  //   },
  //   data: books,
  // };
};
const getCategoryIdFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions,
  categoryId: string
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  console.log(search);
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BookRelationalFields.includes(key)) {
          return {
            [BookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: {
      categoryId,
    },

    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: result,
  };
  // Build the Prisma query based on the query parameters
  // const where = {
  //   AND: [{ price: { gte: minPrice } }, { price: { lte: maxPrice } }],
  // };

  // if (category) {
  //   where.AND.push({ categoryId: category });
  // }

  // if (search) {
  //   where.AND.push({
  //     OR: [
  //       { title: { contains: search, mode: 'insensitive' } },
  //       { author: { contains: search, mode: 'insensitive' } },
  //       { genre: { contains: search, mode: 'insensitive' } },
  //     ],
  //   });
  // }

  // const books = await prisma.book.findMany({
  //   where,
  //   orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
  //   skip: (page - 1) * size,
  //   take: size,
  // });

  // const total = await prisma.book.count({ where });

  // // Calculate total pages
  // const totalPage = Math.ceil(total / size);

  // // const result = await prisma.book.findMany({
  // //   include: {
  // //     category: true,
  // //   },
  // // });
  // return {
  //   meta: {
  //     page,
  //     size,
  //     total,
  //     totalPage,
  //   },
  //   data: books,
  // };
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
  getCategoryIdFromDB,
};
