"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HddProduct = void 0;
const mongoose_1 = require("mongoose");
const Helper_1 = require("../Helper");
const HDDSchema = new mongoose_1.Schema({
    ...Helper_1.BaseSchemaPropertiesAndTypes,
    details: {
        sataType: { type: Number, required: true },
        sizeInCol: { type: Number, required: true },
        capacity: { type: Number, required: true },
        rpm: { type: Number, required: true },
        cache: { type: Number, required: true },
        warranity: Number,
        description: String,
        manufacturerPageUrl: String,
    },
}).add({ details: { chartData: Helper_1.ChartData } });
exports.HddProduct = (0, mongoose_1.model)('HddProduct', HDDSchema);
