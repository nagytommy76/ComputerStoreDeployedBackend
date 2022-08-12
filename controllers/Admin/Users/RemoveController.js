"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserSingleCommentFromProduct = exports.removeSingleUser = void 0;
const CommentHelper_1 = require("./Helper/CommentHelper");
const User_1 = require("../../../models/User/User");
const Memory_1 = require("../../../models/Products/Memory/Memory");
const CpuSchema_1 = require("../../../models/Products/Cpu/CpuSchema");
const VgaProduct_1 = require("../../../models/Products/Vga/VgaProduct");
const SSD_1 = require("../../../models/Products/SSD/SSD");
const HDD_1 = require("../../../models/Products/HDD/HDD");
const removeSingleUser = async (request, response) => {
    try {
        const user = await User_1.User.findById(request.body._id);
        if (!user) {
            return response.status(404).json({ msg: 'Nincs ilyen felhasználó' });
        }
        await user.remove();
        response.status(200).json({ msg: 'sikeres törlés', deleted: true });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.removeSingleUser = removeSingleUser;
/**
 * Kell egy product típus, (cpu/vga/...) hogy el tudjam dönteni hol a komment
 * Illetve egy ProductID, ami alapján keresem a terméket
 * Kell egy kommentID, hogy tudjam törölni a terméken belül
 * UserID elvileg nem kell!?
 */
const removeUserSingleCommentFromProduct = async (request, response) => {
    const { commentID, productID, productType } = request.body;
    if (productID === undefined || productType === undefined || commentID === undefined) {
        return response.status(404).json({ msg: 'Hiányzik a commentID vagy a productID vagy a productType' });
    }
    switch (productType) {
        case 'memory':
            await (0, CommentHelper_1.removeSingleCommentFromRatingValues)(response, Memory_1.MemoryProduct, productID, commentID);
            break;
        case 'cpu':
            await (0, CommentHelper_1.removeSingleCommentFromRatingValues)(response, CpuSchema_1.CpuProduct, productID, commentID);
            break;
        case 'vga':
            await (0, CommentHelper_1.removeSingleCommentFromRatingValues)(response, VgaProduct_1.VgaProduct, productID, commentID);
            break;
        case 'ssd':
            await (0, CommentHelper_1.removeSingleCommentFromRatingValues)(response, SSD_1.SSDProduct, productID, commentID);
            break;
        case 'hdd':
            await (0, CommentHelper_1.removeSingleCommentFromRatingValues)(response, HDD_1.HddProduct, productID, commentID);
            break;
    }
};
exports.removeUserSingleCommentFromProduct = removeUserSingleCommentFromProduct;
