"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BaseRatingController_1 = __importDefault(require("../../../controllers/Products/Ratings/BaseRatingController"));
const Vgas_1 = __importDefault(require("../../../controllers/Products/Vga/Vgas"));
const VgaProduct_1 = require("../../../models/Products/Vga/VgaProduct");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const router = express_1.default.Router();
const vgaProduct = new Vgas_1.default();
const BaseRating = new BaseRatingController_1.default(VgaProduct_1.VgaProduct);
// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
router.get('/', vgaProduct.getAllVgaItemController);
router.get('/filter-data', vgaProduct.getFilterData);
router.get('/details', vgaProduct.getVgaDetailsController);
// Ratings
router.get('/get-vga-rates', BaseRating.getRatingSummaryController);
router.get('/get-vga-comments', BaseRating.getAllComments);
router.post('/rate-vga', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.rateProductController);
router.post('/vga-comment-like', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.likeDislikeCommentController);
router.delete('/vga-comment-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeUsersRatingController);
// Rating Answers
router.post('/save-vga-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.saveAnswerController);
router.delete('/vga-answer-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeSingleCommentAnswer);
module.exports = router;
