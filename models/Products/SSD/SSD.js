"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSDProduct = void 0;
const mongoose_1 = require("mongoose");
const Helper_1 = require("../Helper");
const SSDSchema = new mongoose_1.Schema({
    ...Helper_1.BaseSchemaPropertiesAndTypes,
    details: {
        capacity: { type: Number, required: true },
        connection: { type: String, required: true },
        size: { type: String, required: true },
        readingSpeed: { type: Number, required: true },
        writingSpeed: { type: Number, required: true },
        nandTechnology: { type: String, required: true },
        tbw: { type: Number, required: true },
        warranity: { type: Number, required: false },
        description: { type: String, required: false },
        manufacturerPageUrl: { type: String, required: false },
        chartData: Helper_1.ChartData,
    },
});
exports.SSDProduct = (0, mongoose_1.model)('SsdProduct', SSDSchema);
