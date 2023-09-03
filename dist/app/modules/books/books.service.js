"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const book_constant_1 = require("./book.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.create({
        data,
    });
    return result;
});
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
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    console.log(search);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.BookSearchableFields.map(field => ({
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
                if (book_constant_1.BookRelationalFields.includes(key)) {
                    return {
                        [book_constant_1.BookRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: 'desc',
            },
    });
    const total = yield prisma_1.prisma.book.count({
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
});
const getCategoryIdFromDB = (filters, options, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    console.log(search);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.BookSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                ['categoryId']: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // Filter on price
    if (minPrice && maxPrice) {
        andConditions.push({
            price: {
                gte: Number(minPrice),
                lte: Number(maxPrice),
            },
        });
    }
    else if (minPrice) {
        andConditions.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    else if (maxPrice) {
        andConditions.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.book.findMany({
        include: {
            category: true,
        },
        where: {
            categoryId,
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: 'desc',
            },
    });
    const total = yield prisma_1.prisma.book.count({
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
});
const getSignelDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const UpdateBookDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const DeletedBookDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    getSignelDB,
    UpdateBookDB,
    DeletedBookDB,
    getCategoryIdFromDB,
};
