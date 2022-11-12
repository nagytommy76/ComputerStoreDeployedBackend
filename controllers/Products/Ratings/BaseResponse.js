"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canRemoveProductAnswer = exports.canEditProductAnswer = exports.canSaveProductAnswer = void 0;
const canSaveProductAnswer = (getRatingValuesByProductId) => ({
    saveProductAnswerController: async (productId, commentId, commentDepth, parentCommentId, answer, user) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        const foundComment = foundProduct.ratingValues.find((comment) => comment._id == commentId);
        const foundCommentIndex = foundProduct.ratingValues.findIndex((comment) => comment._id == commentId);
        if (foundComment && user) {
            foundComment.commentAnswers.push({
                answer: answer,
                commentDepth,
                parentCommentId,
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
const canEditProductAnswer = (getRatingValuesByProductId) => ({
    editProductAnswerController: async (productId, commentId, commentAnswerId, editedAnswerText) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        const foundComment = foundProduct.ratingValues.find((comment) => comment._id == commentId);
        const foundCommentAnswer = foundComment?.commentAnswers.find(answer => answer._id == commentAnswerId);
        if (!foundProduct || !foundComment)
            return { foundCommentAnswer: null, foundProduct };
        if (foundCommentAnswer) {
            foundCommentAnswer.answer = editedAnswerText;
            foundProduct.save();
            return { foundCommentAnswer, foundProduct };
        }
        else {
            foundComment.comment = editedAnswerText;
            foundProduct.save();
            return { foundCommentAnswer: foundComment, foundProduct };
        }
    },
});
exports.canEditProductAnswer = canEditProductAnswer;
const canRemoveProductAnswer = (getRatingValuesByProductId) => ({
    removeProductAnswerController: async (productId, commentId, answerId) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        const foundComment = foundProduct.ratingValues.find(comment => comment._id == commentId);
        if (foundComment) {
            const filteredAnswers = foundComment.commentAnswers.filter((answer) => answer._id != answerId);
            foundComment.commentAnswers = filteredAnswers;
            return { foundComment: foundComment.commentAnswers, foundProduct };
        }
        return { foundComment: null, foundProduct };
    },
});
exports.canRemoveProductAnswer = canRemoveProductAnswer;
