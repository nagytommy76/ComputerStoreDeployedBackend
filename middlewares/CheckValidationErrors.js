"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = void 0;
const express_validator_1 = require("express-validator");
const checkErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors);
    next();
};
exports.checkErrors = checkErrors;
