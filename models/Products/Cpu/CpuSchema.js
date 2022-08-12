"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpuProduct = void 0;
const mongoose_1 = require("mongoose");
const Helper_1 = require("../Helper");
const CpuSchema = new mongoose_1.Schema({
    itemNumber: { type: String },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrls: { type: Array, required: true },
    typeCode: { type: String },
    details: {
        coreCount: { type: Number, required: true },
        threadCount: { type: Number, required: true },
        baseClock: { type: Number, required: true },
        boostClock: { type: Number, required: true },
        TDP: { type: Number, required: true },
        l2Cache: Number,
        l3Cache: { type: Number, required: true },
        socket: { type: String, required: true },
        manufacturerPageUrl: { type: String },
        description: { type: String },
        integratedGraphicsName: { type: String, default: 'Nincs' },
        architecture: { type: String },
        cpuCodeName: { type: String },
        stockCooler: { type: Boolean },
        stockCoolerName: { type: String },
        warranity: Number,
    },
}).add({
    inStockQuantity: { type: Number, required: true, default: 0 },
    isHighlighted: { type: Boolean, required: false, default: false },
    ratingValues: Helper_1.ProductRatingValuesSchema,
    details: { chartData: Helper_1.ChartData },
});
exports.CpuProduct = (0, mongoose_1.model)('CpuProduct', CpuSchema);
