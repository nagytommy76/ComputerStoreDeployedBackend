"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseProduct_1 = __importDefault(require("../BaseProduct"));
const Memory_1 = require("../../../models/Products/Memory/Memory");
class MemoryProduct extends BaseProduct_1.default {
    constructor() {
        super(Memory_1.MemoryProduct);
    }
    getAllMemoryProductController = async (request, response) => {
        try {
            const memoryType = request.query.memoryType == 'all' ? '' : request.query.memoryType;
            const selectedFrequencyRange = this.splitStringAndConvertToArray(request.query.selectedFrequencyRange);
            const selectedCapacity = this.splitStringAndConvertToArray(request.query.selectedCapacity);
            const selectedLatencyRange = this.splitStringAndConvertToArray(request.query.latency);
            const extraFilterParameters = {
                'details.frequency': { $gte: selectedFrequencyRange[0], $lte: selectedFrequencyRange[1] },
                'details.capacity': { $gte: selectedCapacity[0], $lte: selectedCapacity[1] },
                'details.latency': { $gte: selectedLatencyRange[0], $lte: selectedLatencyRange[1] },
                'details.memoryType': new RegExp(memoryType, 'i'),
            };
            const { foundProduct, totalPages, totalProductCount } = await this.returnProductModelWithPaginateInfoWithoutDetails(request, extraFilterParameters);
            return response.status(200).json({
                allProducts: foundProduct,
                totalPages,
                totalProductCount,
            });
        }
        catch (error) {
            response.status(500).json(error);
        }
    };
    getMemoryDetailsController = async (request, response) => {
        try {
            const foundDetails = await this.returnProductDetails(request.query.productId);
            response.status(200).json({ productDetails: foundDetails });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getMemoryFilterData = async (_, response) => {
        try {
            const extraGoupParameters = {
                minFrequency: { $min: '$details.frequency' },
                maxFrequency: { $max: '$details.frequency' },
                minLatency: { $min: '$details.latency' },
                maxLatency: { $max: '$details.latency' },
                capacities: { $addToSet: '$details.capacity' },
            };
            const filters = await this.baseFilterData(extraGoupParameters);
            filters[0].capacities.sort();
            response.status(200).json(filters[0]);
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
}
exports.default = MemoryProduct;
