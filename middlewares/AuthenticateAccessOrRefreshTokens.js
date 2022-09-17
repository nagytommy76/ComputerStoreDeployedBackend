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
    // az access token-re van itt szükségem
    const token = getTokenFromAuthorizationHeader(req.headers.authorization);
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, endpoints_config_1.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ errorMessage: 'accessToken token expired' });
        if (!user)
            return res.status(404).json({ errorMessage: 'user not found' });
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
        if (!user)
            return res.status(404).json({ errorMessage: 'user not found' });
        if (user.isAdmin) {
            req.user = user;
            next();
        }
        else {
            return res.status(403).json({ errorMessage: 'user is not admin' });
        }
    });
};
exports.checkUserIsAdmin = checkUserIsAdmin;
// https://dev.to/nilanth/how-to-secure-jwt-in-a-single-page-application-cko
// https://www.youtube.com/watch?v=27KeYk-5vJw&ab_channel=DaveGray
