"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMemoryValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseValidators_1 = require("../../Validators/BaseValidators");
exports.insertMemoryValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'Memória gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.capacity', 'Kapacitás'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.memoryType', 'Típus'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.frequency', 'Órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.latency', 'Késleltetés'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.voltage', 'Feszültség'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
];
