"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VgaProduct = void 0;
const mongoose_1 = require("mongoose");
const Helper_1 = require("../Helper");
const VgaSchema = new mongoose_1.Schema({
    itemNumber: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrls: { type: Array, required: true },
    details: {
        gpuManufacturer: { type: String, required: true },
        pcieType: { type: String, required: true },
        gpuBaseClock: { type: Number, required: true },
        gpuPeakClock: { type: Number, required: true },
        vramCapacity: { type: Number, required: true },
        vramType: { type: String, required: true },
        vramBandwidth: { type: Number, required: true },
        powerConsuption: { type: Number, required: true },
        description: String,
        powerPin: String,
        warranity: Number,
        displayPort: Number,
        DVI: Number,
        HDMI: Number,
        minPowerSupply: Number,
        length: Number,
        manufacturerPageUrl: String,
        vramSpeed: Number,
        streamProcessors: Number,
    },
    typeCode: String,
}).add({
    inStockQuantity: { type: Number, required: true, default: 0 },
    isHighlighted: { type: Boolean, required: false, default: false },
    ratingValues: Helper_1.ProductRatingValuesSchema,
    details: { chartData: Helper_1.ChartData },
});
exports.VgaProduct = (0, mongoose_1.model)('VgaProduct', VgaSchema);
// https://www.geeksforgeeks.org/how-to-make-mongoose-multiple-collections-using-node-js/
