"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catagory_routes_1 = require("../modules/Catagory/catagory.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const books_routes_1 = require("../modules/books/books.routes");
const order_routes_1 = require("../modules/order/order.routes");
const profile_routes_1 = require("../modules/profiles/profile.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/',
        routes: user_routes_1.UserRouter,
    },
    {
        path: '/',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/categories',
        routes: catagory_routes_1.CatagoryRouter,
    },
    {
        path: '/books',
        routes: books_routes_1.BookRouter,
    },
    {
        path: '/orders',
        routes: order_routes_1.OrderRouter,
    },
    {
        path: '/profile',
        routes: profile_routes_1.ProfileRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
