"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCpuValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseValidators_1 = require("../../Validators/BaseValidators");
exports.insertCpuValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'Cpu gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.coreCount', 'Magok száma'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.threadCount', 'Szálak száma'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.baseClock', 'Alap órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.boostClock', 'Turbó órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.l3Cache', 'l3Cache'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.TDP', 'TDP'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.socket', 'Foglalat'),
];
