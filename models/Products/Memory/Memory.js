"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryProduct = void 0;
const mongoose_1 = require("mongoose");
const Helper_1 = require("../Helper");
const MemorySchema = new mongoose_1.Schema({
    itemNumber: { type: String },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrls: { type: Array, required: true },
    typeCode: { type: String },
    details: {
        warranity: Number,
        manufacturerPageUrl: { type: String },
        description: { type: String },
        memoryType: { type: String, required: true },
        capacity: { type: Number, required: true },
        frequency: { type: Number, required: true },
        latency: { type: Number, required: true },
        voltage: { type: Number, required: true },
        moduleNumber: { type: Number, default: 1 },
    },
    inStockQuantity: { type: Number, default: 0 },
    isHighlighted: { type: Boolean, default: false },
    ratingValues: Helper_1.ProductRatingValuesSchema,
}).add({ details: { chartData: Helper_1.ChartData } });
exports.MemoryProduct = (0, mongoose_1.model)('MemoryProduct', MemorySchema);
