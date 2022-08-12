"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canRemoveProductAnswer = exports.canSaveProductAnswer = void 0;
const canSaveProductAnswer = (getRatingValuesByProductId) => ({
    saveProductAnswerController: async (productId, commentId, answer, user) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        const foundComment = foundProduct.ratingValues.find((comment) => comment._id == commentId);
        const foundCommentIndex = foundProduct.ratingValues.findIndex((comment) => comment._id == commentId);
        if (foundComment && user) {
            foundComment.commentAnswers.push({
                answer: answer,
                answeredAt: new Date(),
                userId: user._id,
                userName: user.userName,
            });
        }
        return {
            newCommentAnswers: foundProduct.ratingValues[foundCommentIndex].commentAnswers,
            foundProduct,
        };
    },
});
exports.canSaveProductAnswer = canSaveProductAnswer;
const canRemoveProductAnswer = (getRatingValuesByProductId) => ({
    removeProductAnswerController: async (productId, commentId, answerId) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        const foundComment = foundProduct.ratingValues.find((comment) => comment._id == commentId);
        if (foundComment) {
            const filteredAnswers = foundComment.commentAnswers.filter((answer) => answer._id != answerId);
            foundComment.commentAnswers = filteredAnswers;
        }
        return { foundComment: foundComment.commentAnswers, foundProduct };
    },
});
exports.canRemoveProductAnswer = canRemoveProductAnswer;
