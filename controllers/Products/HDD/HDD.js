"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseProduct_1 = __importDefault(require("../BaseProduct"));
const HDD_1 = require("../../../models/Products/HDD/HDD");
class HDDProduct extends BaseProduct_1.default {
    constructor() {
        super(HDD_1.HddProduct);
    }
    getAllHDDProductController = async (request, response) => {
        try {
            const cacheRange = this.splitStringAndConvertToArray(request.query.cacheRange);
            const capacityRange = this.splitStringAndConvertToArray(request.query.capacityRange);
            const rpmRange = this.splitStringAndConvertToArray(request.query.rpmRange);
            const extraFilterParams = {
                'details.cache': { $gte: cacheRange[0], $lte: cacheRange[1] },
                'details.capacity': { $gte: capacityRange[0], $lte: capacityRange[1] },
                'details.rpm': { $gte: rpmRange[0], $lte: rpmRange[1] },
            };
            const { foundProduct, totalPages } = await this.returnProductModelWithPaginateInfoWithoutDetails(request, extraFilterParams);
            response.status(200).json({
                allProducts: foundProduct,
                totalPages,
            });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getHDDDetailsController = async (request, response) => {
        try {
            const foundDetails = await this.returnProductDetails(request.query.productId);
            response.status(200).json({ productDetails: foundDetails });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getHDDFilterData = async (_, response) => {
        try {
            const extraGroupParams = {
                minCapacity: { $min: '$details.capacity' },
                maxCapacity: { $max: '$details.capacity' },
                minCache: { $min: '$details.cache' },
                maxCache: { $max: '$details.cache' },
                minRpm: { $min: '$details.rpm' },
                maxRpm: { $max: '$details.rpm' },
            };
            const foundParams = await this.baseFilterData(extraGroupParams);
            response.status(200).json(foundParams[0]);
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
}
exports.default = HDDProduct;
