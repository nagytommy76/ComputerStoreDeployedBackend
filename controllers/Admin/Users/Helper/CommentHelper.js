"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSingleCommentFromRatingValues = void 0;
// Itt szintén nem jó az any, Megoldani!!!
const removeSingleCommentFromRatingValues = async (response, ProductModel, productID, commentID) => {
    try {
        const product = await ProductModel.findOne({ _id: productID });
        if (product === null) {
            return response.status(404).json({ msg: 'Nincs ilyen termék' });
        }
        product.ratingValues = product.ratingValues.filter((rating) => {
            return rating._id != commentID;
        });
        product.save();
        return response.status(200).json({
            msg: 'sikeres törlés',
        });
    }
    catch (error) {
        response.status(500).json({ msg: 'Hiba történt a törlés során' });
    }
};
exports.removeSingleCommentFromRatingValues = removeSingleCommentFromRatingValues;
