"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_SECRET = exports.URL_PATH = exports.EMAIL_SECRET = exports.DB_CONNECTION = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = void 0;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? '';
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? '';
exports.DB_CONNECTION = process.env.DB_CONNECTION ?? '';
exports.EMAIL_SECRET = process.env.EMAIL_SECRET ?? '';
// export const URL_PATH = process.env.URL_PATH_DEVELOPMENT ?? ''
exports.URL_PATH = process.env.URL_PATH_PRODUCTION ?? '';
exports.PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET ?? '';
