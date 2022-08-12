"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVgaProductByIdController = exports.getAllVgaItemsForDeleteController = exports.modifyVgaProductController = exports.insertVgaItemController = exports.getAllVgaItemsController = void 0;
const CreateVga_1 = require("./CreateVga");
const VgaProduct_1 = require("../../../models/Products/Vga/VgaProduct");
const BaseController_1 = __importDefault(require("../BaseController"));
const BaseAdmin = (0, BaseController_1.default)(VgaProduct_1.VgaProduct);
const getAllVgaItemsController = async (req, res) => {
    try {
        const vgaProducts = await BaseAdmin.getAllProduct();
        return res.status(200).json({ allProducts: vgaProducts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAllVgaItemsController = getAllVgaItemsController;
const insertVgaItemController = async (req, res) => {
    try {
        const vga = new VgaProduct_1.VgaProduct((0, CreateVga_1.returnFilledVgaProductObject)(req.body));
        await vga.save();
        // const saved = BaseAdmin.insert()
        return res.sendStatus(201);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.insertVgaItemController = insertVgaItemController;
const modifyVgaProductController = async (req, res) => {
    try {
        VgaProduct_1.VgaProduct.findById(req.body._id)
            .then(vga => {
            if (vga) {
                vga.details = req.body.details;
                BaseAdmin.modifyChartData(vga.details, req.body.price);
                vga.itemNumber = req.body.itemNumber;
                vga.type = req.body.type;
                vga.typeCode = req.body.typeCode;
                vga.manufacturer = req.body.manufacturer;
                vga.price = req.body.price;
                vga.pictureUrls = req.body.pictureUrls;
                vga.inStockQuantity = req.body.inStockQuantity;
                vga.isHighlighted = req.body.isHighlighted;
                vga.save();
            }
        })
            .catch(errors => console.log(errors));
        return res.sendStatus(201);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.modifyVgaProductController = modifyVgaProductController;
// Delete Vga
const getAllVgaItemsForDeleteController = async (req, res) => {
    try {
        const vgaProducts = await VgaProduct_1.VgaProduct.find()
            .select(['manufacturer', 'price', 'type', 'inStockQuantity'])
            .sort({ price: 'asc' });
        return res.status(200).json({ allProducts: vgaProducts });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAllVgaItemsForDeleteController = getAllVgaItemsForDeleteController;
const deleteVgaProductByIdController = (req, res) => {
    try {
        VgaProduct_1.VgaProduct.findByIdAndRemove(req.body.productID)
            .then(() => {
            return res.status(200).json({ msg: 'sikeres törlés', deleted: true });
        })
            .catch(error => res.status(500).json(error));
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteVgaProductByIdController = deleteVgaProductByIdController;
