"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = void 0;
const User_1 = require("../../models/User/User");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const endpoints_config_1 = require("../../config/endpoints.config");
const Users_1 = require("./Users");
const nodemailer_1 = __importDefault(require("../../config/Mail/nodemailer"));
/**
 * Validálni kell a user email-t, hogy van-e ilyen felhasználó
 * Kell generálnom egy Tokent (úgy mint a regisztrációnál)
 * Utána létre kell hozni egy liknet a frontend-re, ezt küldöm el a usernek ha megadta az email címét
 */
const NodeMailerInstance = new nodemailer_1.default();
const forgotPasswordController = async (request, response) => {
    try {
        const { userEmailOrUsername } = request.body;
        const checkUserRegistered = await User_1.User.findOne({
            $or: [{ email: userEmailOrUsername }, { userName: userEmailOrUsername }],
        }).lean();
        if (checkUserRegistered === null) {
            return response.status(404).json((0, Users_1.ErrorResponse)(true, 'Az email cím nincs még regisztrálva!'));
        }
        const forgotPassToken = (0, jsonwebtoken_1.sign)({ email: userEmailOrUsername, userId: checkUserRegistered._id }, endpoints_config_1.PASSWORD_SECRET + checkUserRegistered.password, {
            expiresIn: '10m',
        });
        const validationLink = `${endpoints_config_1.URL_PATH}forgot-password/${checkUserRegistered.email}/${forgotPassToken}`;
        await NodeMailerInstance.sendResetPasswordLinkEmail(validationLink, checkUserRegistered.email);
        response.status(200).json({
            message: 'A jelszó emlékeztető email sikeresen elküldve a megadott email címre!',
            validationLink,
        });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.forgotPasswordController = forgotPasswordController;
// A frontendről megkapom a 2 jelszót, meg az előzőleg elküldött tokent -> validálni kell
const resetPasswordController = async (request, response) => {
    const { passwordToken, firstPassword, userEmail } = request.body;
    const validationErrors = (0, express_validator_1.validationResult)(request);
    if (!validationErrors.isEmpty())
        return response.status(422).json({ errors: validationErrors.array() });
    const foundUser = await User_1.User.findOne({ email: userEmail });
    if (foundUser === null)
        return response.status(404).json((0, Users_1.ErrorResponse)(true, 'Felhasználó nem található!'));
    try {
        const hashedNewPass = await bcrypt_1.default.hash(firstPassword, 10);
        (0, jsonwebtoken_1.verify)(passwordToken, endpoints_config_1.PASSWORD_SECRET + foundUser.password, async (err, decoded) => {
            if (err)
                return response.status(403).json({ errorMessage: 'password token expired' });
            if (decoded) {
                foundUser.password = hashedNewPass;
                foundUser.save();
                return response.status(200).json({ message: 'A jelszó módosítás sikeres volt!' });
            }
        });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.resetPasswordController = resetPasswordController;
// https://www.youtube.com/watch?v=72JYhSoVYPc&ab_channel=yoursTRULY
// https://www.youtube.com/watch?v=kfw61IxDgW8&ab_channel=AwaisMirza
