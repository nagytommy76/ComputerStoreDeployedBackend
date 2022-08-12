"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHDDValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseValidators_1 = require("../../Validators/BaseValidators");
exports.insertHDDValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'HDD gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.capacity', 'Kapacitás'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.rpm', 'Fordulat'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.sataType', 'SATA típusa'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.sizeInCol', 'Méret'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.cache', 'Cache'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
];
