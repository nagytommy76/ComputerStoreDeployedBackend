"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCpuProductByIdController = exports.getAllCpuItemsForDeleteController = exports.modifyCpuProductController = exports.insertCpuController = exports.getAllCpuItemsController = void 0;
const CpuSchema_1 = require("../../../models/Products/Cpu/CpuSchema");
const BaseController_1 = __importDefault(require("../BaseController"));
const AdminController = (0, BaseController_1.default)(CpuSchema_1.CpuProduct);
const getAllCpuItemsController = async (req, res) => {
    try {
        const cpuProducts = await AdminController.getAllProduct();
        return res.status(200).json({ allProducts: cpuProducts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAllCpuItemsController = getAllCpuItemsController;
const insertCpuController = async (req, res) => {
    try {
        const { itemNumber, type, typeCode, manufacturer, price, pictureUrls, isHighlighted, inStockQuantity, details, } = req.body;
        const toInsertProperties = {
            itemNumber: itemNumber,
            type: type,
            typeCode: typeCode,
            manufacturer: manufacturer,
            price: price,
            pictureUrls: pictureUrls,
            isHighlighted: isHighlighted,
            ratingValues: [],
            inStockQuantity,
        };
        const createdCpu = await AdminController.insert(details, toInsertProperties);
        const saved = await createdCpu.save();
        if (saved)
            return res.sendStatus(201);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.insertCpuController = insertCpuController;
const modifyCpuProductController = async (req, res) => {
    try {
        const toModifyCpuProduct = await AdminController.getProductToModify(req.body._id);
        if (toModifyCpuProduct) {
            toModifyCpuProduct.details = req.body.details;
            AdminController.modifyChartData(toModifyCpuProduct.details, req.body.price);
            toModifyCpuProduct.itemNumber = req.body.itemNumber;
            toModifyCpuProduct.type = req.body.type;
            toModifyCpuProduct.typeCode = req.body.typeCode;
            toModifyCpuProduct.manufacturer = req.body.manufacturer;
            toModifyCpuProduct.price = req.body.price;
            toModifyCpuProduct.pictureUrls = req.body.pictureUrls;
            toModifyCpuProduct.inStockQuantity = req.body.inStockQuantity;
            toModifyCpuProduct.isHighlighted = req.body.isHighlighted;
            await toModifyCpuProduct.save();
            return res.sendStatus(201);
        }
        else
            return res.sendStatus(404);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.modifyCpuProductController = modifyCpuProductController;
// DELETE CPU
const getAllCpuItemsForDeleteController = async (req, res) => {
    try {
        const cpuProducts = await AdminController.getAllToDeleteProducts();
        res.status(200).json({ allProducts: cpuProducts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAllCpuItemsForDeleteController = getAllCpuItemsForDeleteController;
const deleteCpuProductByIdController = async (req, res) => {
    try {
        await AdminController.delete(req.body.productID);
        return res.status(200).json({ msg: 'sikeres törlés', deleted: true });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteCpuProductByIdController = deleteCpuProductByIdController;
