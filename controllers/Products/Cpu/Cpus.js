"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CpuSchema_1 = require("../../../models/Products/Cpu/CpuSchema");
const BaseProduct_1 = __importDefault(require("../BaseProduct"));
class CpuProduct extends BaseProduct_1.default {
    constructor() {
        super(CpuSchema_1.CpuProduct);
    }
    getAllCpuItemController = async (req, res) => {
        try {
            const { coreCount, baseFrequencyRange, selectedSocket, l3CacheRange, tdpRange, threadCount, turboFrequencyRange, } = req.query;
            const socket = selectedSocket == 'all' ? '' : selectedSocket;
            const coreRange = this.splitStringAndConvertToArray(coreCount);
            const threadRange = this.splitStringAndConvertToArray(threadCount);
            const frequencyRange = this.splitStringAndConvertToArray(baseFrequencyRange);
            const turboRange = this.splitStringAndConvertToArray(turboFrequencyRange);
            const tdp = this.splitStringAndConvertToArray(tdpRange);
            const l3Range = this.splitStringAndConvertToArray(l3CacheRange);
            const extraQueryParams = {
                'details.socket': new RegExp(socket, 'i'),
                'details.coreCount': { $gte: coreRange[0], $lte: coreRange[1] },
                'details.threadCount': { $gte: threadRange[0], $lte: threadRange[1] },
                'details.baseClock': { $gte: frequencyRange[0], $lte: frequencyRange[1] },
                'details.boostClock': { $gte: turboRange[0], $lte: turboRange[1] },
                'details.l3Cache': { $gte: l3Range[0], $lte: l3Range[1] },
                'details.TDP': { $gte: tdp[0], $lte: tdp[1] },
            };
            const { foundProduct, totalPages, totalProductCount } = await this.returnProductModelWithPaginateInfoWithoutDetails(req, extraQueryParams);
            res.status(200).json({
                allProducts: foundProduct,
                totalPages,
                totalProductCount,
            });
        }
        catch (error) {
            res.status(500).json(error);
        }
    };
    getCpuDetailsController = async (request, response) => {
        try {
            const foundDetails = await this.returnProductDetails(request.query.productId);
            response.status(200).json({ productDetails: foundDetails[0] });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getCpuCompareDetailsController = async (request, response) => {
        try {
            const convertedToArrayOrString = this.splitStringAndConvertToArray(request.query.productId);
            const foundDetails = await this.returnProductDetails(convertedToArrayOrString);
            response.status(200).json({ productDetails: foundDetails });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getCpuFilterData = async (_, res) => {
        try {
            const extraGroup = {
                minCoreCount: { $min: '$details.coreCount' },
                maxCoreCount: { $max: '$details.coreCount' },
                minThreadCount: { $min: '$details.threadCount' },
                maxThreadCount: { $max: '$details.threadCount' },
                minBaseFrequency: { $min: '$details.baseClock' },
                maxBaseFrequency: { $max: '$details.baseClock' },
                minTurboFrequency: { $min: '$details.boostClock' },
                maxTurboFrequency: { $max: '$details.boostClock' },
                minL3Cache: { $min: '$details.l3Cache' },
                maxL3Cache: { $max: '$details.l3Cache' },
                minTDP: { $min: '$details.TDP' },
                maxTDP: { $max: '$details.TDP' },
                allSockets: { $addToSet: '$details.socket' },
            };
            const filtererGroups = await this.baseFilterData(extraGroup);
            filtererGroups[0].allSockets.sort();
            res.status(200).json(filtererGroups[0]);
        }
        catch (error) {
            res.status(500).json({ errorMessage: error });
        }
    };
}
exports.default = CpuProduct;
