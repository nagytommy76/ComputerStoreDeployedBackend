"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemoryProductByIdController = exports.getAllMemoryItemsForDeleteController = exports.modifyMemoryProductController = exports.insertMemoryProduct = exports.getAllMemoryController = void 0;
const Memory_1 = require("../../../models/Products/Memory/Memory");
const BaseController_1 = __importDefault(require("../BaseController"));
const AdminController = (0, BaseController_1.default)(Memory_1.MemoryProduct);
const getAllMemoryController = async (request, response) => {
    try {
        const memoryProducts = await AdminController.getAllProduct();
        response.status(200).json({ allProducts: memoryProducts });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllMemoryController = getAllMemoryController;
const insertMemoryProduct = async (request, response) => {
    try {
        const { details, inStockQuantity, manufacturer, pictureUrls, price, type, isHighlighted, itemNumber, typeCode, } = request.body;
        details.voltage = parseFloat(details.voltage);
        const result = await AdminController.insert(details, {
            inStockQuantity,
            manufacturer,
            pictureUrls,
            price,
            type,
            isHighlighted,
            itemNumber,
            typeCode,
        });
        response.status(201).json({ msg: 'sikeres bevitel', result });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.insertMemoryProduct = insertMemoryProduct;
const modifyMemoryProductController = async (request, response) => {
    try {
        const { _id, details, inStockQuantity, manufacturer, pictureUrls, price, type, isHighlighted, itemNumber, typeCode, } = request.body;
        const foundMemoryProduct = await AdminController.getProductToModify(_id);
        if (foundMemoryProduct) {
            foundMemoryProduct.details = details;
            AdminController.modifyChartData(foundMemoryProduct.details, price);
            foundMemoryProduct.inStockQuantity = inStockQuantity;
            foundMemoryProduct.manufacturer = manufacturer;
            foundMemoryProduct.pictureUrls = pictureUrls;
            foundMemoryProduct.price = price;
            foundMemoryProduct.type = type;
            foundMemoryProduct.isHighlighted = isHighlighted;
            foundMemoryProduct.itemNumber = itemNumber;
            foundMemoryProduct.typeCode = typeCode;
            foundMemoryProduct.save();
            return response.sendStatus(201);
        }
        response.sendStatus(404);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.modifyMemoryProductController = modifyMemoryProductController;
const getAllMemoryItemsForDeleteController = async (request, response) => {
    try {
        const allMemories = await AdminController.getAllToDeleteProducts();
        return response.status(200).json({ allProducts: allMemories });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllMemoryItemsForDeleteController = getAllMemoryItemsForDeleteController;
const deleteMemoryProductByIdController = async (request, response) => {
    try {
        await AdminController.delete(request.body.productID);
        response.status(200).json({ msg: 'sikeres törlés', deleted: true });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.deleteMemoryProductByIdController = deleteMemoryProductByIdController;
