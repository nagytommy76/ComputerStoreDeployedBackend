"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendEmailController = exports.ValidateEmailRegistrationController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User/User");
const endpoints_config_1 = require("../../config/endpoints.config");
const nodemailer_1 = __importDefault(require("../../config/Mail/nodemailer"));
const nodemailer = new nodemailer_1.default();
const ValidateEmailRegistrationController = (req, res) => {
    const { confirmCode } = req.body;
    try {
        jsonwebtoken_1.default.verify(confirmCode, endpoints_config_1.EMAIL_SECRET, (error, decoded) => {
            if (error)
                return res.status(403).json({ errorMsg: error.message });
            const { email } = decoded;
            User_1.User.findOne({ email }).then(foundUser => {
                if (foundUser) {
                    foundUser.isEmailConfirmed = true;
                    foundUser.save();
                    return res.sendStatus(200);
                }
                else
                    res.status(404).json({ message: `Nem található ${email} email címmel felhasználó!` });
            });
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.ValidateEmailRegistrationController = ValidateEmailRegistrationController;
const ResendEmailController = async (req, res) => {
    const { confirmCode, userEmailOrUsername } = req.body;
    try {
        // Ha érvénytelen vagy hibás a valid kód
        if (confirmCode !== null) {
            const { email, userName } = jsonwebtoken_1.default.decode(confirmCode);
            const emailToken = signAnEmailTokenWithUserEmailAndName(userName, email);
            await nodemailer.sendEmailUserRegistersAndResendEmail(email, 'Megerősítő kód újraküldése', userName, emailToken);
            return res
                .status(200)
                .json({
                message: `Az új regisztrációs kód el lett küldve a korábban megadott email címre: ${email}`,
            });
        }
        else if (userEmailOrUsername !== null) {
            // A login oldalon, ha még nincs validálva
            const foundUser = await User_1.User.findOne({
                $or: [{ email: userEmailOrUsername }, { userName: userEmailOrUsername }],
            }).select('userName email');
            if (foundUser) {
                const emailToken = signAnEmailTokenWithUserEmailAndName(foundUser.userName, foundUser.email);
                await nodemailer.sendEmailUserRegistersAndResendEmail(foundUser.email, 'Megerősítő kód újraküldése', foundUser.userName, emailToken);
                return res.status(200).json({ message: 'Az email sikeresen elküldve az email címedre!' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.ResendEmailController = ResendEmailController;
const signAnEmailTokenWithUserEmailAndName = (userName, email) => {
    return jsonwebtoken_1.default.sign({ userName, email }, endpoints_config_1.EMAIL_SECRET, { expiresIn: `${nodemailer.EMAIL_TOKEN_EXPIRESIN}min` });
};
