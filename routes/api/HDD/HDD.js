"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const HDD_1 = __importDefault(require("../../../controllers/Products/HDD/HDD"));
const HDD_2 = require("../../../models/Products/HDD/HDD");
const BaseRatingController_1 = __importDefault(require("../../../controllers/Products/Ratings/BaseRatingController"));
const hddProduct = new HDD_1.default();
const BaseRating = new BaseRatingController_1.default(HDD_2.HddProduct);
const router = (0, express_1.Router)();
router.get('/', hddProduct.getAllHDDProductController);
router.get('/filter-data', hddProduct.getHDDFilterData);
router.get('/details', hddProduct.getHDDDetailsController);
// Ratings
router.get('/get-hdd-rates', BaseRating.getRatingSummaryController);
router.get('/get-hdd-comments', BaseRating.getAllComments);
router.delete('/hdd-comment-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeUsersRatingController);
router.post('/rate-hdd', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.rateProductController);
router.post('/hdd-comment-like', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.likeDislikeCommentController);
// Rating answers
router.post('/save-hdd-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.saveAnswerController);
router.patch('/edit-hdd-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editAnswerController);
router.patch('/edit-hdd-comment', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.editCommentController);
router.delete('/hdd-answer-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeSingleCommentAnswer);
module.exports = router;
