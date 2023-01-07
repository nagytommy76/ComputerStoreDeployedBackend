"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseProduct_1 = __importDefault(require("../BaseProduct"));
const SSD_1 = require("../../../models/Products/SSD/SSD");
class SSDProduct extends BaseProduct_1.default {
    constructor() {
        super(SSD_1.SSDProduct);
    }
    getAllSSDProductController = async (request, response) => {
        try {
            const { capacityRange, connection, nand, readSpeedRange, writingSpeedRange, size, tbw } = request.query;
            const capacity = this.splitStringAndConvertToArray(capacityRange);
            const readingSpeedRange = this.splitStringAndConvertToArray(readSpeedRange);
            const writeSpeedRange = this.splitStringAndConvertToArray(writingSpeedRange);
            const tbwRange = this.splitStringAndConvertToArray(tbw);
            const connectionType = connection === 'all' ? '' : connection;
            const nandType = nand === 'all' ? '' : nand;
            const sizeType = size === 'all' ? '' : size;
            const extraFilterParams = {
                'details.capacity': { $gte: capacity[0], $lte: capacity[1] },
                'details.connection': new RegExp(connectionType, 'i'),
                'details.nandTechnology': new RegExp(nandType, 'i'),
                'details.size': new RegExp(sizeType, 'i'),
                'details.readingSpeed': { $gte: readingSpeedRange[0], $lte: readingSpeedRange[1] },
                'details.writingSpeed': { $gte: writeSpeedRange[0], $lte: writeSpeedRange[1] },
                'details.tbw': { $gte: tbwRange[0], $lte: tbwRange[1] },
            };
            const { foundProduct, totalPages, totalProductCount } = await this.returnProductModelWithPaginateInfoWithoutDetails(request, extraFilterParams);
            response.status(200).json({ allProducts: foundProduct, totalPages, totalProductCount });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getSSDFilterDataController = async (_, response) => {
        try {
            const extraGroup = {
                allConnection: { $addToSet: '$details.connection' },
                allNand: { $addToSet: '$details.nandTechnology' },
                allSizes: { $addToSet: '$details.size' },
                minCapacity: { $min: '$details.capacity' },
                maxCapacity: { $max: '$details.capacity' },
                minReadSpeed: { $min: '$details.readingSpeed' },
                maxReadSpeed: { $max: '$details.readingSpeed' },
                minWriteSpeed: { $min: '$details.writingSpeed' },
                maxWriteSpeed: { $max: '$details.writingSpeed' },
                minTBW: { $min: '$details.tbw' },
                maxTBW: { $max: '$details.tbw' },
            };
            const foundParams = await this.baseFilterData(extraGroup);
            response.status(200).json(foundParams[0]);
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getSSDDetailsController = async (request, response) => {
        try {
            const foundSSDProducts = await this.returnProductDetails(request.query.productId);
            response.status(200).json({ productDetails: foundSSDProducts[0] });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
    getSSDCompareDetailsController = async (request, response) => {
        try {
            const convertedToArrayOrString = this.splitStringAndConvertToArray(request.query.productId);
            const foundDetails = await this.returnProductDetails(convertedToArrayOrString);
            response.status(200).json({ productDetails: foundDetails });
        }
        catch (error) {
            response.status(500).json({ errorMessage: error });
        }
    };
}
exports.default = SSDProduct;
