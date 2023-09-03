import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterableFields } from './book.constant';
import { BookService } from './books.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book create Successfull',
    data: result,
  });
});
// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const result = await BookService.getAllFromDB(req.query);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book fetched Successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched Successfully',

    data: result,
  });
});
const getCategoryIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const categoryId = req.params.categoryId;
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
  const result = await BookService.getCategoryIdFromDB(
    filters,
    options,
    categoryId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched Successfully',

    data: result,
  });
});
const getSignleDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSignelDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched Successfully',
    data: result,
  });
});
const UpdateBookDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await BookService.UpdateBookDB(id, UpdateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated Successfully',
    data: result,
  });
});
const DeletedBookDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.DeletedBookDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Deleted Successfully',
    data: result,
  });
});
export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getSignleDB,
  UpdateBookDB,
  DeletedBookDB,
  getCategoryIdFromDB,
};
