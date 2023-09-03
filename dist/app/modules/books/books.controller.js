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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constant_1 = require("./book.constant");
const books_service_1 = require("./books.service");
const insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_service_1.BookService.insertIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book create Successfull',
        data: result,
    });
}));
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
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.BookFilterableFields);
    const options = (0, pick_1.default)(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
    const result = yield books_service_1.BookService.getAllFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book fetched Successfully',
        data: result,
    });
}));
const getCategoryIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.BookFilterableFields);
    const categoryId = req.params.categoryId;
    const options = (0, pick_1.default)(req.query, ['page', 'size', 'sortBy', 'sortOrder']);
    const result = yield books_service_1.BookService.getCategoryIdFromDB(filters, options, categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book fetched Successfully',
        data: result,
    });
}));
const getSignleDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_service_1.BookService.getSignelDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book fetched Successfully',
        data: result,
    });
}));
const UpdateBookDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = yield books_service_1.BookService.UpdateBookDB(id, UpdateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Updated Successfully',
        data: result,
    });
}));
const DeletedBookDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.DeletedBookDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book Deleted Successfully',
        data: result,
    });
}));
exports.BookController = {
    insertIntoDB,
    getAllFromDB,
    getSignleDB,
    UpdateBookDB,
    DeletedBookDB,
    getCategoryIdFromDB,
};
