"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHDDProductByIdController = exports.getAllHDDItemsForDeleteController = exports.modifyHDDProductController = exports.insertHDDProductController = exports.getAllHDDToModifyController = void 0;
const HDD_1 = require("../../../models/Products/HDD/HDD");
const BaseController_1 = __importDefault(require("../BaseController"));
const AdminController = (0, BaseController_1.default)(HDD_1.HddProduct);
const getAllHDDToModifyController = async (request, response) => {
    try {
        response.status(200).json({ allProducts: await AdminController.getAllProduct() });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllHDDToModifyController = getAllHDDToModifyController;
const insertHDDProductController = async (request, response) => {
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
        response.status(201).json({ msg: 'sikeres bevitel' });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.insertHDDProductController = insertHDDProductController;
const modifyHDDProductController = async (request, response) => {
    try {
        const { _id, details, inStockQuantity, manufacturer, pictureUrls, price, type, isHighlighted, itemNumber, typeCode, } = request.body;
        const foundHDDProduct = await AdminController.getProductToModify(_id);
        if (foundHDDProduct) {
            foundHDDProduct.details = details;
            AdminController.modifyChartData(foundHDDProduct.details, price);
            console.log(foundHDDProduct.details.chartData);
            foundHDDProduct.inStockQuantity = inStockQuantity;
            foundHDDProduct.manufacturer = manufacturer;
            foundHDDProduct.pictureUrls = pictureUrls;
            foundHDDProduct.price = price;
            foundHDDProduct.isHighlighted = isHighlighted;
            foundHDDProduct.itemNumber = itemNumber;
            foundHDDProduct.type = type;
            foundHDDProduct.typeCode = typeCode;
            foundHDDProduct.save();
            return response.sendStatus(201);
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.modifyHDDProductController = modifyHDDProductController;
// Delete HDD
const getAllHDDItemsForDeleteController = async (req, res) => {
    try {
        const allProducts = await AdminController.getAllToDeleteProducts();
        return res.status(200).json({ allProducts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAllHDDItemsForDeleteController = getAllHDDItemsForDeleteController;
const deleteHDDProductByIdController = (req, res) => {
    try {
        const result = AdminController.delete(req.body.productId);
        res.status(200).json({ msg: 'sikeres törlés', deleted: true });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteHDDProductByIdController = deleteHDDProductByIdController;
