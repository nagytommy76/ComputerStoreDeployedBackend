"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRating_1 = __importDefault(require("./BaseRating"));
class BaseRating {
    ProductModel;
    BaseRatingHelper;
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
        this.BaseRatingHelper = (0, BaseRating_1.default)(ProductModel);
    }
    getRatingSummaryController = async (req, res) => {
        try {
            const returnRatingValues = await this.BaseRatingHelper.getProductRatingSummary(req.query._id);
            return res.status(200).json(returnRatingValues);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    getAllComments = async (req, res) => {
        try {
            const allComments = await this.ProductModel.find({ _id: req.query._id }, 'ratingValues');
            return res.status(200).json(allComments[0].ratingValues);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    rateProductController = async (req, res) => {
        try {
            const modifiedProduct = await this.BaseRatingHelper.saveRateProductHelper(req.body.productId, req.body.rating, req.body.comment, req.body.userName, req.user?._id);
            if (modifiedProduct !== undefined) {
                modifiedProduct.save();
                return res.sendStatus(201);
            }
            else
                return res.sendStatus(422);
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    };
    removeUsersRatingController = async (req, res) => {
        try {
            const { body: { productId, commentIdToDelete }, } = req;
            const result = await this.BaseRatingHelper.removeUsersRating(productId, commentIdToDelete, req.user?._id);
            switch (result.statusCode) {
                case 200:
                    return res.status(result.statusCode).json(result);
                case 404:
                    return res.sendStatus(404);
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    // Rating answers
    saveAnswerController = async (req, res) => {
        try {
            const { foundProduct, newCommentAnswers } = await this.BaseRatingHelper.saveProductAnswerController(req.body.productId, req.body.commentId, req.body.commentDepth, req.body.parentCommentId, req.body.answer, req.user);
            foundProduct.save();
            return res.status(201).json(newCommentAnswers);
        }
        catch (error) {
            res.status(500).json({ error });
        }
    };
    removeSingleCommentAnswer = async (req, res) => {
        try {
            const { foundComment, foundProduct } = await this.BaseRatingHelper.removeProductAnswerController(req.body.productId, req.body.commentId, req.body.answerId);
            if (foundProduct) {
                foundProduct.save();
                return res.status(200).json(foundComment);
            }
            return res.sendStatus(404);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    editAnswerController = async (req, res) => {
        try {
            const { answerEditText, answerId, commentId, productId } = req.body;
            const { foundCommentAnswer } = await this.BaseRatingHelper.editProductAnswerController(productId, commentId, answerId, answerEditText);
            if (foundCommentAnswer !== null)
                res.status(200).json({ foundCommentAnswer });
            else
                res.sendStatus(404);
        }
        catch (error) {
            console.error(error);
        }
    };
    editCommentController = async (req, res) => {
        try {
            const { answerEditText, answerId, commentId, productId } = req.body;
            const { foundCommentAnswer } = await this.BaseRatingHelper.editProductAnswerController(productId, commentId, answerId, answerEditText);
            res.status(200).json({ foundCommentAnswer });
        }
        catch (error) {
            console.error(error);
        }
    };
    likeDislikeCommentController = async (req, res) => {
        try {
            const { productId, commentId, isLike, answerId } = req.body;
            let result;
            if (answerId) {
                result = await this.BaseRatingHelper.likeDislikeAnswers(productId, commentId, req.user?._id, isLike, answerId);
            }
            else {
                result = await this.BaseRatingHelper.likeDislikeComment(productId, commentId, req.user?._id, isLike);
            }
            switch (result.statusCode) {
                case 201:
                    return res.status(result.statusCode).json({ responses: result.responses });
                case 405:
                    return res.status(result.statusCode).json(result);
                case 404:
                    return res.sendStatus(result.statusCode);
            }
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
}
exports.default = BaseRating;
