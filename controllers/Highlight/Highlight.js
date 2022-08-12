"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightController = void 0;
const CpuSchema_1 = require("../../models/Products/Cpu/CpuSchema");
const VgaProduct_1 = require("../../models/Products/Vga/VgaProduct");
const HDD_1 = require("../../models/Products/HDD/HDD");
const Memory_1 = require("../../models/Products/Memory/Memory");
const SSD_1 = require("../../models/Products/SSD/SSD");
const BaseGetHighlights = async (ProductModel) => {
    return await ProductModel.find({ isHighlighted: true })
        .select('price manufacturer type typeCode pictureUrls ratingValues._id')
        .sort({ price: 1 })
        .lean();
};
const HighlightController = async (req, res) => {
    const CpuHighlights = await BaseGetHighlights(CpuSchema_1.CpuProduct);
    const VgaHighlights = await BaseGetHighlights(VgaProduct_1.VgaProduct);
    const HddHighlights = await BaseGetHighlights(HDD_1.HddProduct);
    const MemoryHighlights = await BaseGetHighlights(Memory_1.MemoryProduct);
    const SSDHighlights = await BaseGetHighlights(SSD_1.SSDProduct);
    res.status(200).json({
        CpuHighlights,
        VgaHighlights,
        HddHighlights,
        MemoryHighlights,
        SSDHighlights,
    });
};
exports.HighlightController = HighlightController;
