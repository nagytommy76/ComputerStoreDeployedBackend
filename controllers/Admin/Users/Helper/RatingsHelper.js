"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnAllUserRatingsByProductType = void 0;
const CpuSchema_1 = require("../../../../models/Products/Cpu/CpuSchema");
const VgaProduct_1 = require("../../../../models/Products/Vga/VgaProduct");
const Memory_1 = require("../../../../models/Products/Memory/Memory");
const SSD_1 = require("../../../../models/Products/SSD/SSD");
const HDD_1 = require("../../../../models/Products/HDD/HDD");
// Nem túl jó megoldás, utánanézni mi a hiba han nincs any
const getFoundUserRatingsInAnyProduct = async (productModel, userId) => {
    return await productModel
        .find({ 'ratingValues.userId': userId }, { ratingValues: { $elemMatch: { userId } }, type: 1, manufacturer: 1 })
        .lean();
};
const returnAllUserRatingsByProductType = async (userId) => {
    const allFoundUserRatingsInCpu = await getFoundUserRatingsInAnyProduct(CpuSchema_1.CpuProduct, userId);
    const allFoundUserRatingsInVga = await getFoundUserRatingsInAnyProduct(VgaProduct_1.VgaProduct, userId);
    const allFoundUserRatingsInMemory = await getFoundUserRatingsInAnyProduct(Memory_1.MemoryProduct, userId);
    const allFoundUserRatingsInSSD = await getFoundUserRatingsInAnyProduct(SSD_1.SSDProduct, userId);
    const allFoundUserRatingsInHDD = await getFoundUserRatingsInAnyProduct(HDD_1.HddProduct, userId);
    return {
        cpu: allFoundUserRatingsInCpu,
        vga: allFoundUserRatingsInVga,
        memory: allFoundUserRatingsInMemory,
        ssd: allFoundUserRatingsInSSD,
        hdd: allFoundUserRatingsInHDD,
    };
};
exports.returnAllUserRatingsByProductType = returnAllUserRatingsByProductType;
