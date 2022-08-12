"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_1 = require("./BaseResponse");
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
const canLikeDislike = (getRatingValuesByProductId) => ({
    likeDislikeComment: async (productId, commentId, userId, isLike) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        if (foundProduct) {
            const foundComment = foundProduct.ratingValues.filter((comment) => comment._id == commentId);
            // A user a saját kommentjét ne tudja like/dislikeolni
            if (foundComment[0].userId == userId) {
                return {
                    statusCode: 405,
                    message: 'A saját kommented nem like-olhatod :)',
                };
            }
            if (foundComment[0].responses.length == 0) {
                // Ha még nincs like/dislike
                foundComment[0].responses.push({ isLike: isLike, userId });
            }
            else {
                // Ha van már like
                // A user adott már like/dislike-ot?
                // Ha egy user már likeolta/dislikeolta az adott commentet, nem engedem még 1*
                if (foundComment[0].responses.some((element) => element.userId == userId)) {
                    return { message: 'Már értékelted a kommentet', statusCode: 405 };
                }
                else
                    foundComment[0].responses.push({ isLike, userId });
            }
            foundProduct.save();
            return {
                message: 'Sikeresen mentve!',
                statusCode: 201,
                responses: foundComment[0].responses,
            };
        }
        return { message: '', statusCode: 404 };
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
        ...canLikeDislike(getProductById.getRatingValuesByProductId),
        ...canRemoveRating(getProductById.getRatingValuesByProductId),
        // Responses
        ...(0, BaseResponse_1.canSaveProductAnswer)(getProductById.getRatingValuesByProductId),
        ...(0, BaseResponse_1.canRemoveProductAnswer)(getProductById.getRatingValuesByProductId),
    };
}
exports.default = BaseRatingController;
