"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserDetailsValidator = void 0;
const express_validator_1 = require("express-validator");
const notEmptyFieldWithMessage = (fieldName, messageBody, minimum = 3) => (0, express_validator_1.body)(fieldName)
    .isLength({ min: minimum })
    .trim()
    .withMessage(`A(z) ${messageBody} mező kitöltése kötelező!`);
const phoneNumberValidator = (value) => {
    const regex = /^(\+?36|06)(1|20|30|50|70)\d{7}$/;
    if (!regex.test(value))
        throw new Error('Csak magyar vezetékes/vonalas telefonszám formátum lehetséges, pl.:(06305552222)');
    return true;
};
exports.insertUserDetailsValidator = [
    (0, express_validator_1.body)('userDetails.address.zipCode')
        .isPostalCode('HU')
        .withMessage(`Az irányítósám mezőnek 1000 és 9999 között kell elnnie`),
    (0, express_validator_1.body)('userDetails.phone').custom(phoneNumberValidator),
    notEmptyFieldWithMessage('userDetails.firstName', 'Vezetéknév'),
    notEmptyFieldWithMessage('userDetails.lastName', 'Keresztnév'),
    notEmptyFieldWithMessage('userDetails.address.city', 'Város', 2),
    notEmptyFieldWithMessage('userDetails.address.street', 'Utca'),
    (0, express_validator_1.body)('userDetails.address.houseNumber')
        .isInt({ min: 1, max: 550 })
        .withMessage('A házszám minimum 1 és maximum 550 lehet!'),
];
