"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.checkTokensValidityController = exports.logoutController = exports.loginUserController = exports.registerUserController = void 0;
const User_1 = require("../../models/User/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const endpoints_config_1 = require("../../config/endpoints.config");
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("../../config/Mail/nodemailer"));
const nodemailer = new nodemailer_1.default();
const registerUserController = async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const firstPass = req.body.firstPassword;
    try {
        await User_1.User.register(email, userName, firstPass);
    }
    catch (error) {
        return res.status(404).json((0, exports.ErrorResponse)(true, error.message));
    }
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty())
        return res.status(422).json({ errors: validationErrors.array() });
    try {
        const hashedPass = await bcrypt_1.default.hash(firstPass, 10);
        const emailToken = jsonwebtoken_1.default.sign({ userName, email }, endpoints_config_1.EMAIL_SECRET, {
            expiresIn: `${nodemailer.EMAIL_TOKEN_EXPIRESIN}min`,
        });
        await User_1.User.create({
            userName,
            password: hashedPass,
            email,
        });
        await nodemailer.sendEmailUserRegistersAndResendEmail(email, 'Email cím regisztrálása', userName, emailToken);
        res.status(201).json({
            message: 'A regisztráció sikeres volt - Az email címedre megküldtük a regisztráció megerősítéhez szükséges kódot!',
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.registerUserController = registerUserController;
const loginUserController = async (req, res) => {
    const userName = req.body.email;
    try {
        const user = await User_1.User.login(userName);
        if (await bcrypt_1.default.compare(req.body.password, user.password)) {
            if (!user.isEmailConfirmed)
                return res
                    .status(403)
                    .json((0, exports.ErrorResponse)(true, 'Az email címed még nem lett regsiztrálva! Kérlek erősítsd meg!'));
            const accessToken = generateTokens(user._id, user.userName, user.isAdmin, user.email, endpoints_config_1.ACCESS_TOKEN_SECRET);
            const refreshToken = generateTokens(user._id, user.userName, user.isAdmin, user.email, endpoints_config_1.REFRESH_TOKEN_SECRET, '2day');
            // Itt a lejárati időnek ugyan annyinak kéne lennie mint a tokenenknek
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 nap * 24 óra * 1óra * 1 perc
            })
                .status(200)
                .json({
                accessToken,
                userId: user._id,
                userName: user.userName,
                isAdmin: user.isAdmin,
            });
        }
        else
            res.status(403).json((0, exports.ErrorResponse)(true, 'Helytelen jelszó', 'password'));
    }
    catch (error) {
        res.status(404).json((0, exports.ErrorResponse)(true, error.message));
    }
};
exports.loginUserController = loginUserController;
const logoutController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken)
        return res.sendStatus(204);
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Sikeres kijelentkezés' });
};
exports.logoutController = logoutController;
const checkTokensValidityController = (req, res) => {
    // Ide a refresh token kell
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    try {
        jsonwebtoken_1.default.verify(refreshToken, endpoints_config_1.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).json({ errorMessage: 'refresh token expired' });
            const newAccessToken = generateTokens(decoded._id, decoded.userName, decoded.isAdmin, decoded.email, endpoints_config_1.ACCESS_TOKEN_SECRET);
            res.status(200).json(newAccessToken);
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.checkTokensValidityController = checkTokensValidityController;
// EZEKET ÁTTENNI KÜLÖN FILE-BA!!!!!!!!!!
/**
 *
 * @param user UserTypes
 * @param TOKEN_SECRET string
 * @param expiresIn string
 * @returns an accessToken or refreshToken with the passed in user's data
 */
const generateTokens = (userId, userName, isAdmin, email, TOKEN_SECRET, expiresIn = '15min') => {
    return jsonwebtoken_1.default.sign({ _id: userId, userName, isAdmin, email }, TOKEN_SECRET, { expiresIn });
};
const ErrorResponse = (hasError, errorMessage = '', errorType = 'email') => {
    return {
        errorType,
        hasError,
        errorMessage,
    };
};
exports.ErrorResponse = ErrorResponse;
