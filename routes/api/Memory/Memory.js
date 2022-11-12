"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BaseRatingController_1 = __importDefault(require("../../../controllers/Products/Ratings/BaseRatingController"));
const Memory_1 = __importDefault(require("../../../controllers/Products/Memory/Memory"));
const Memory_2 = require("../../../models/Products/Memory/Memory");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const router = (0, express_1.Router)();
const memoryProduct = new Memory_1.default();
const BaseRating = new BaseRatingController_1.default(Memory_2.MemoryProduct);
router.get('/', memoryProduct.getAllMemoryProductController);
router.get('/filter-data', memoryProduct.getMemoryFilterData);
router.get('/details', memoryProduct.getMemoryDetailsController);
// Ratings
router.get('/get-memory-rates', BaseRating.getRatingSummaryController);
router.get('/get-memory-comments', BaseRating.getAllComments);
router.post('/rate-memory', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.rateProductController);
router.post('/memory-comment-like', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.likeDislikeCommentController);
router.delete('/memory-comment-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeUsersRatingController);
// Rating Answers
router.post('/save-memory-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.saveAnswerController);
router.patch('/edit-memory-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editAnswerController);
router.patch('/edit-memory-comment', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editCommentController);
router.delete('/memory-answer-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeSingleCommentAnswer);
module.exports = router;
