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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatagoryService = void 0;
const prisma_1 = require("../../../shared/prisma");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.catagory.create({
        data,
    });
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.catagory.findMany({
        include: {
            books: true,
        },
    });
    return result;
});
const getSignelDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.catagory.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return result;
});
const UpdateCategoryDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.catagory.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const DeletedCategoryDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.catagory.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CatagoryService = {
    insertIntoDB,
    getAllFromDB,
    getSignelDB,
    UpdateCategoryDB,
    DeletedCategoryDB,
};
