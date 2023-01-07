"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const SSD_1 = __importDefault(require("../../../controllers/Products/SSD/SSD"));
const SSD_2 = require("../../../models/Products/SSD/SSD");
const BaseRatingController_1 = __importDefault(require("../../../controllers/Products/Ratings/BaseRatingController"));
const ssdProduct = new SSD_1.default();
const BaseRating = new BaseRatingController_1.default(SSD_2.SSDProduct);
const router = (0, express_1.Router)();
router.get('/', ssdProduct.getAllSSDProductController);
router.get('/filter-data', ssdProduct.getSSDFilterDataController);
router.get('/details', ssdProduct.getSSDDetailsController);
router.get('/compare', ssdProduct.getSSDCompareDetailsController);
// Ratings
router.get('/get-ssd-rates', BaseRating.getRatingSummaryController);
router.get('/get-ssd-comments', BaseRating.getAllComments);
router.delete('/ssd-comment-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeUsersRatingController);
router.post('/rate-ssd', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.rateProductController);
router.post('/ssd-comment-like', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.likeDislikeCommentController);
// Rating answers
router.post('/save-ssd-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.saveAnswerController);
router.patch('/edit-ssd-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editAnswerController);
router.patch('/edit-ssd-comment', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editCommentController);
router.delete('/ssd-answer-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeSingleCommentAnswer);
module.exports = router;
