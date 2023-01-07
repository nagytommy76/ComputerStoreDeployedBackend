"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VgaProduct_1 = require("../../../models/Products/Vga/VgaProduct");
const BaseProduct_1 = __importDefault(require("../BaseProduct"));
class VgaProduct extends BaseProduct_1.default {
    constructor() {
        super(VgaProduct_1.VgaProduct);
    }
    getAllVgaItemController = async (req, res) => {
        try {
            const { baseClock, boostClock, gpuManufacturer, length, pciType, tdp, vramBandwidth, vramCapacity, vramType, } = req.query;
            const selectedGpuMan = gpuManufacturer == 'all' ? '' : gpuManufacturer;
            const selectedPciType = pciType == 'all' ? '' : pciType;
            const selectedVramType = vramType == 'all' ? '' : vramType;
            const baseClockRange = this.splitStringAndConvertToArray(baseClock);
            const boostClockRange = this.splitStringAndConvertToArray(boostClock);
            const lengthRange = this.splitStringAndConvertToArray(length);
            const tdpRange = this.splitStringAndConvertToArray(tdp);
            const bandwidthRange = this.splitStringAndConvertToArray(vramBandwidth);
            const capacityRange = this.splitStringAndConvertToArray(vramCapacity);
            const extraQueryParams = {
                'details.gpuBaseClock': { $gte: baseClockRange[0], $lte: baseClockRange[1] },
                'details.gpuPeakClock': { $gte: boostClockRange[0], $lte: boostClockRange[1] },
                'details.length': { $gte: lengthRange[0], $lte: lengthRange[1] },
                'details.powerConsuption': { $gte: tdpRange[0], $lte: tdpRange[1] },
                'details.vramBandwidth': { $gte: bandwidthRange[0], $lte: bandwidthRange[1] },
                'details.vramCapacity': { $gte: capacityRange[0], $lte: capacityRange[1] },
                'details.gpuManufacturer': new RegExp(selectedGpuMan, 'i'),
                'details.pcieType': new RegExp(selectedPciType, 'i'),
                'details.vramType': new RegExp(selectedVramType, 'i'),
            };
            const { foundProduct, totalPages, totalProductCount } = await this.returnProductModelWithPaginateInfoWithoutDetails(req, extraQueryParams);
            res.status(200).json({
                allProducts: foundProduct,
                totalPages,
                totalProductCount,
            });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    getVgaDetailsController = async (request, response) => {
        try {
            const foundDetails = await this.returnProductDetails(request.query.productId);
            response.status(200).json({ productDetails: foundDetails[0] });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getVgaCompareDetailsController = async (request, response) => {
        try {
            const convertedToArrayOrString = this.splitStringAndConvertToArray(request.query.productId);
            const foundDetails = await this.returnProductDetails(convertedToArrayOrString);
            response.status(200).json({ productDetails: foundDetails });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getFilterData = async (_, res) => {
        try {
            const extraGroup = {
                minBaseClock: { $min: '$details.gpuBaseClock' },
                maxBaseClock: { $max: '$details.gpuBaseClock' },
                minBoostClock: { $min: '$details.gpuPeakClock' },
                maxBoostClock: { $max: '$details.gpuPeakClock' },
                gpuManufacturer: { $addToSet: '$details.gpuManufacturer' },
                minLength: { $min: '$details.length' },
                maxLength: { $max: '$details.length' },
                pciType: { $addToSet: '$details.pcieType' },
                minTdp: { $min: '$details.powerConsuption' },
                maxTdp: { $max: '$details.powerConsuption' },
                minVramBandwidth: { $min: '$details.vramBandwidth' },
                maxVramBandwidth: { $max: '$details.vramBandwidth' },
                minVramCapacity: { $min: '$details.vramCapacity' },
                maxVramCapacity: { $max: '$details.vramCapacity' },
                vramType: { $addToSet: '$details.vramType' },
            };
            const filterData = await this.baseFilterData(extraGroup);
            res.status(200).json(filterData[0]);
        }
        catch (error) {
            return res.status(500).json({ errorMessage: error });
        }
    };
}
exports.default = VgaProduct;
