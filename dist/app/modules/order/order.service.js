"use strict";
// import { IOrderBooks } from './order.interface';
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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = payload;
    if (orderedBooks) {
        const orderData = {
            userId: userId,
            orderedBooks: orderedBooks,
        };
        const result = yield prisma_1.prisma.order.create({
            data: orderData,
        });
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, `Order created failed`);
    }
});
const getOrderFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const result = yield prisma_1.prisma.order.findMany({});
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'admin not fund');
        }
        return result;
    }
    if (user.role === 'customer') {
        const result = yield prisma_1.prisma.order.findMany({ where: { userId: user.id } });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'admin not fund');
        }
        return result;
    }
    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'order Not Found');
});
const getSingleOrder = (userId, role, id) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === 'customer') {
        result = yield prisma_1.prisma.order.findUnique({ where: { id, userId } });
    }
    else {
        result = yield prisma_1.prisma.order.findUnique({
            where: {
                id,
            },
        });
    }
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Orders not found');
    }
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getOrderFromDB,
    getSingleOrder,
};
