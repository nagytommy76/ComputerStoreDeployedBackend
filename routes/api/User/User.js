"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserValidator_1 = require("./Validators/UserValidator");
const UserDetailsValidator_1 = require("./Validators/UserDetailsValidator");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const CheckValidationErrors_1 = require("../../../middlewares/CheckValidationErrors");
const CheckUserIsFound_1 = require("../../../middlewares/CheckUserIsFound");
const Users_1 = require("../../../controllers/User/Users");
const EmailValidation_1 = require("../../../controllers/User/EmailValidation");
const UserDetails_1 = require("../../../controllers/User/UserDetails");
const ResetPassword_1 = require("../../../controllers/User/ResetPassword");
const router = express_1.default.Router();
router.post('/register', UserValidator_1.ValidateRegister, Users_1.registerUserController);
router.post('/login', Users_1.loginUserController);
router.post('/confirm-email', EmailValidation_1.ValidateEmailRegistrationController);
router.post('/resend-email', EmailValidation_1.ResendEmailController);
router.post('/refresh-token', Users_1.checkTokensValidityController);
router.post('/check-access-token', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, (req, res) => {
    return res.json({ msg: 'sikeres authentikáció' });
});
// User Details
router.get('/get-details', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, UserDetails_1.getUserDetailsController);
router.post('/insert-details', UserDetailsValidator_1.insertUserDetailsValidator, AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckValidationErrors_1.checkErrors, CheckUserIsFound_1.checkUserIsFound, UserDetails_1.insertUserDetailsController);
router.patch('/modify-details', UserDetailsValidator_1.insertUserDetailsValidator, AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckValidationErrors_1.checkErrors, CheckUserIsFound_1.checkUserIsFound, UserDetails_1.updateUserDetailsController);
// Forgot password
router.post('/forgot-password', ResetPassword_1.forgotPasswordController);
router.post('/reset-password', UserValidator_1.ValidatePasswordMatch, ResetPassword_1.resetPasswordController);
// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
// https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/#Set-Up-an-Authorization-Service
module.exports = router;
