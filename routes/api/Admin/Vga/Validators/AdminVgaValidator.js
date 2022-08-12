"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyVgaValidator = exports.insertVgaValidator = void 0;
const express_validator_1 = require("express-validator");
const BaseValidators_1 = require("../../Validators/BaseValidators");
exports.insertVgaValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('itemNumber', 'típus szám'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'Vga gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.gpuManufacturer', 'Gpu gyártó'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.pcieType', 'PCI-E típus'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.gpuBaseClock', 'Gpu alap órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.gpuPeakClock', 'Gpu emelt órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramCapacity', 'Vram mennyiség'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.vramType', 'Vram típus'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramBandwidth', 'Vram adatátvitel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramSpeed', 'Vram sebesség'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.powerConsuption', 'Fogyasztás'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.streamProcessors', 'Stream processzorok'),
];
exports.modifyVgaValidator = [
    (0, express_validator_1.body)('pictureUrls').custom(BaseValidators_1.pictureUrlsLengthGreaterOne),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('itemNumber', 'típus szám'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('_id', 'ObjectId'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('type', 'típus név'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('manufacturer', 'Vga gyártó'),
    (0, BaseValidators_1.notZeroValueWithMessage)('price', 'Ár'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.gpuManufacturer', 'Gpu gyártó'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.pcieType', 'PCI-E típus'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.gpuBaseClock', 'Gpu alap órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.gpuPeakClock', 'Gpu emelt órajel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramCapacity', 'Vram mennyiség'),
    (0, BaseValidators_1.notEmptyFieldWithMessage)('details.vramType', 'Vram típus'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramBandwidth', 'Vram adatátvitel'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.vramSpeed', 'Vram sebesség'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.powerConsuption', 'Fogyasztás'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.warranity', 'Garancia'),
    (0, BaseValidators_1.notZeroValueWithMessage)('details.streamProcessors', 'Stream processzorok'),
];
