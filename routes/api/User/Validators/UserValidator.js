"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePasswordMatch = exports.ValidateRegister = void 0;
const express_validator_1 = require("express-validator");
const checkPasswordsEquality = (value, { req }) => {
    if (value !== req.body.secondPassword)
        throw new Error('A két jelszó nem egyezik!');
    return true;
};
exports.ValidateRegister = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('firstPassword').custom(checkPasswordsEquality),
];
exports.ValidatePasswordMatch = [
    (0, express_validator_1.body)('firstPassword').custom(checkPasswordsEquality),
    (0, express_validator_1.body)('firstPassword').custom((firstPassword) => {
        if (firstPassword.length <= 4)
            throw new Error('Legalább 4 karakter hosszú jelszó legyen!');
        return true;
    }),
    (0, express_validator_1.body)('secondPassword').custom((secondPassword) => {
        if (secondPassword.length <= 4)
            throw new Error('Legalább 4 karakter hosszú jelszó legyen!');
        return true;
    }),
];
