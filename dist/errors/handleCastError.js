"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message = '';
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record Not Found';
        errors = [
            {
                path: '',
                message,
            },
        ];
    }
    if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'delete Faild';
            errors = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.default = handleClientError;
