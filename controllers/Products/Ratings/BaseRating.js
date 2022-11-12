"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_1 = require("./BaseResponse");
const LikeDislike_1 = require("./LikeDislike");
const canReturnById = (state) => ({
    getLeanProductById: async (ProductId) => {
        return await state.productModel.findById(ProductId).lean();
    },
    getProductById: async (ProductId) => {
        return await state.productModel.findById(ProductId);
    },
    getLeanRatingValuesByProductId: async (productId) => {
        return await state.productModel.findById(productId, 'ratingValues').lean();
    },
    getRatingValuesByProductId: async (productId) => {
        return await state.productModel.findById(productId, 'ratingValues');
    },
    getCommentsInFoundProduct: (Product, commentId) => {
        return Product.ratingValues.filter(comment => comment._id == commentId);
    },
});
const canReturnRatingAndComments = (getLeanProductById) => ({
    getProductRatingSummary: async (productId) => {
        const allProductRatings = await getLeanProductById(productId);
        const rateCount = allProductRatings?.ratingValues.length || 0;
        let rateSum = 0;
        allProductRatings?.ratingValues.map((obj) => {
            rateSum += obj.rating;
        });
        return {
            rateCount,
            avgRating: rateSum / rateCount || 0,
        };
    },
});
const canReturnAllComments = (getRatingValues) => ({
    getAllComments: async (productId) => {
        return await getRatingValues(productId);
    },
});
const canGetProductRatingSummary = (getLeanProductById) => ({
    getProductRatingSummary: async (productId) => {
        const allProductRatings = await getLeanProductById(productId);
        const rateCount = allProductRatings?.ratingValues.length || 0;
        let rateSum = 0;
        allProductRatings?.ratingValues.map((obj) => {
            rateSum += obj.rating;
        });
        return {
            rateCount,
            avgRating: rateSum / rateCount || 0,
        };
    },
});
// Save
const canRateProduct = (getProductById) => ({
    saveRateProductHelper: async (productId, rating, comment, userName, userId) => {
        const foundProduct = await getProductById(productId);
        let foundRatingByUser = foundProduct.ratingValues.find((ratings) => ratings.userId == userId);
        if (foundRatingByUser === undefined) {
            foundProduct?.ratingValues.push({
                rating,
                comment,
                userName,
                ratedAt: new Date(),
                userId,
            });
            return foundProduct;
        }
        else
            return undefined;
    },
});
const canRemoveRating = (getRatingValuesByProductId) => ({
    removeUsersRating: async (productId, commentIdToDelete, userId) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        if (foundProduct) {
            const updatedComments = foundProduct.ratingValues.filter((rating) => rating._id != commentIdToDelete && rating.userId != userId);
            foundProduct.ratingValues = updatedComments;
            foundProduct.save();
            return { message: 'Sikeresen törölted a kommented!', statusCode: 200, foundProduct };
        }
        else
            return { message: '', statusCode: 404 };
    },
});
function BaseRatingController(productModel) {
    const state = {
        productModel,
    };
    const getProductById = canReturnById(state);
    return {
        ...canReturnRatingAndComments(getProductById.getLeanProductById),
        ...canReturnAllComments(getProductById.getLeanRatingValuesByProductId),
        ...canGetProductRatingSummary(getProductById.getLeanProductById),
        ...canRateProduct(getProductById.getProductById),
        ...(0, LikeDislike_1.canLikeDislike)(getProductById.getRatingValuesByProductId),
        ...canRemoveRating(getProductById.getRatingValuesByProductId),
        // Responses
        ...(0, BaseResponse_1.canSaveProductAnswer)(getProductById.getRatingValuesByProductId),
        ...(0, BaseResponse_1.canRemoveProductAnswer)(getProductById.getRatingValuesByProductId),
        ...(0, BaseResponse_1.canEditProductAnswer)(getProductById.getRatingValuesByProductId),
    };
}
exports.default = BaseRatingController;
