"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSSDValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseValidators_1 = require("../../Validators/BaseValidators");
exports.insertSSDValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'HDD gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.capacity', 'Kapacitás'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.size', 'Méret'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.connection', 'Csatoló'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.nandTechnology', 'Nand Technológia'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.readingSpeed', 'Olvasási sebesség'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.writingSpeed', 'Írási sebesség'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.tbw', 'TBW'),
];
