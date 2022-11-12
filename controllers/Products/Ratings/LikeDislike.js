"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canLikeDislike = void 0;
const returnFoundComment = (foundProduct, commentId) => {
    return foundProduct.ratingValues.filter(comment => comment._id == commentId);
};
const returnFoundCommentAnswer = (foundComment, answerId) => {
    return foundComment[0].commentAnswers.find(answer => answer._id == answerId);
};
const checkFoundCommentOrAnswer = (foundCommentOrAnswer, isLike, userId, message = 'kommented') => {
    // A user a saját kommentjét ne tudja like/dislikeolni
    if (foundCommentOrAnswer.userId == userId) {
        return {
            statusCode: 405,
            message: `A saját ${message} nem like-olhatod :)`,
        };
    }
    if (foundCommentOrAnswer.responses.length == 0) {
        // Ha még nincs like/dislike
        foundCommentOrAnswer.responses.push({ isLike, userId });
    }
    else {
        // Ha van már like
        // A user adott már like/dislike-ot?
        const foundCommentIndex = foundCommentOrAnswer.responses.findIndex(comment => comment.userId == userId);
        if (foundCommentIndex >= 0)
            foundCommentOrAnswer.responses.splice(foundCommentIndex, 1);
        else
            foundCommentOrAnswer.responses.push({ isLike, userId });
    }
    return null;
};
const canLikeDislike = (getRatingValuesByProductId) => ({
    likeDislikeComment: async (productId, commentId, userId, isLike) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        if (!foundProduct)
            return { message: '', statusCode: 404 };
        const foundComment = returnFoundComment(foundProduct, commentId);
        const returnValue = checkFoundCommentOrAnswer(foundComment[0], isLike, userId);
        if (returnValue)
            return returnValue;
        foundProduct.save();
        return {
            message: 'Sikeresen mentve!',
            statusCode: 201,
            responses: foundComment[0].responses,
        };
    },
    likeDislikeAnswers: async (productId, commentId, userId, isLike, answerId) => {
        const foundProduct = await getRatingValuesByProductId(productId);
        if (!foundProduct)
            return { message: '', statusCode: 404 };
        const foundComment = returnFoundComment(foundProduct, commentId);
        const foundCommentAnswer = returnFoundCommentAnswer(foundComment, answerId);
        if (!foundCommentAnswer)
            return { message: 'A válasz nem találhatő', statusCode: 404 };
        const returnValue = checkFoundCommentOrAnswer(foundCommentAnswer, isLike, userId, 'válaszodat');
        if (returnValue)
            return returnValue;
        foundProduct.save();
        return {
            message: 'Sikeresen mentve!',
            statusCode: 201,
            responses: foundCommentAnswer.responses,
        };
    },
});
exports.canLikeDislike = canLikeDislike;
