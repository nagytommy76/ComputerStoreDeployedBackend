"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSSDProductByIdController = exports.getAllSSDItemsForDeleteController = exports.modifySSDProductController = exports.insertSSDProductController = exports.getAllSSDController = void 0;
const SSD_1 = require("../../../models/Products/SSD/SSD");
const BaseController_1 = __importDefault(require("../BaseController"));
const AdminController = (0, BaseController_1.default)(SSD_1.SSDProduct);
const getAllSSDController = async (request, response) => {
    try {
        const ssdProducts = await AdminController.getAllProduct();
        response.status(200).json({ allProducts: ssdProducts });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllSSDController = getAllSSDController;
const insertSSDProductController = async (request, response) => {
    try {
        const { details, inStockQuantity, manufacturer, pictureUrls, price, type, isHighlighted, itemNumber, typeCode, } = request.body;
        await AdminController.insert(details, {
            inStockQuantity,
            manufacturer,
            pictureUrls,
            price,
            type,
            isHighlighted,
            itemNumber,
            typeCode,
        });
        response.status(201).json({ msg: 'sikeres SSD bevitel!!!' });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.insertSSDProductController = insertSSDProductController;
const modifySSDProductController = async (request, response) => {
    try {
        const { _id, details, inStockQuantity, manufacturer, pictureUrls, price, type, isHighlighted, itemNumber, typeCode, } = request.body;
        const foundSSDProduct = await AdminController.getProductToModify(_id);
        if (foundSSDProduct) {
            foundSSDProduct.details = details;
            AdminController.modifyChartData(foundSSDProduct.details, price);
            foundSSDProduct.inStockQuantity = inStockQuantity;
            foundSSDProduct.manufacturer = manufacturer;
            foundSSDProduct.pictureUrls = pictureUrls;
            foundSSDProduct.price = price;
            foundSSDProduct.type = type;
            foundSSDProduct.isHighlighted = isHighlighted;
            foundSSDProduct.itemNumber = itemNumber;
            foundSSDProduct.typeCode = typeCode;
            foundSSDProduct.save();
            return response.sendStatus(201);
        }
        response.sendStatus(404);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.modifySSDProductController = modifySSDProductController;
const getAllSSDItemsForDeleteController = async (request, response) => {
    try {
        const allSSDs = await AdminController.getAllToDeleteProducts();
        return response.status(200).json({ allProducts: allSSDs });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllSSDItemsForDeleteController = getAllSSDItemsForDeleteController;
const deleteSSDProductByIdController = async (request, response) => {
    try {
        await AdminController.delete(request.body.productID);
        response.status(200).json({ msg: 'sikeres törlés', deleted: true });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.deleteSSDProductByIdController = deleteSSDProductByIdController;
