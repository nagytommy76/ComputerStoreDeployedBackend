"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notZeroValueWithMessage = exports.notEmptyFieldWithMessage = exports.pictureUrlsLengthGreaterOne = void 0;
const express_validator_1 = require("express-validator");
const pictureUrlsLengthGreaterOne = (value) => {
    if (value.length < 1)
        throw new Error('Legalább egy kép URL megadása szükséges');
    findAnyEmptyPicUrlString(value);
    return true;
};
exports.pictureUrlsLengthGreaterOne = pictureUrlsLengthGreaterOne;
const findAnyEmptyPicUrlString = (picUrlArray) => {
    picUrlArray.map(picUrl => {
        if (picUrl == '')
            throw new Error('Nem lehet üres mező!');
    });
};
const notEmptyFieldWithMessage = (fieldName, messageBody) => (0, express_validator_1.body)(fieldName).isLength({ min: 3 }).trim().withMessage(`A(z) ${messageBody} mező kitöltése kötelező!`);
exports.notEmptyFieldWithMessage = notEmptyFieldWithMessage;
const notZeroValueWithMessage = (fieldName, messageBody) => (0, express_validator_1.body)(fieldName).not().equals('0').withMessage(`A(z) ${messageBody} mező nem lehet nulla!`);
exports.notZeroValueWithMessage = notZeroValueWithMessage;
