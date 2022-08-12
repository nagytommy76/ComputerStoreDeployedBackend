"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIsAdmin = exports.authenticateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const endpoints_config_1 = require("../config/endpoints.config");
const getTokenFromAuthorizationHeader = (authHeader) => {
    return authHeader && authHeader?.split(' ')[1];
};
const authenticateAccessToken = (req, res, next) => {
    const token = getTokenFromAuthorizationHeader(req.headers.authorization);
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, endpoints_config_1.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ errorMessage: 'accessToken token expired' });
        req.user = user;
        next();
    });
};
exports.authenticateAccessToken = authenticateAccessToken;
const checkUserIsAdmin = (req, res, next) => {
    const token = getTokenFromAuthorizationHeader(req.headers.authorization);
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, endpoints_config_1.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ errorMessage: 'accessToken token expired' });
        if (user?.isAdmin && user) {
            req.user = user;
            next();
        }
        else {
            return res.status(403).json({ errorMessage: 'user is not admin' });
        }
    });
};
exports.checkUserIsAdmin = checkUserIsAdmin;
