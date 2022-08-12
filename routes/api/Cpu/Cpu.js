"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cpus_1 = __importDefault(require("../../../controllers/Products/Cpu/Cpus"));
const BaseRatingController_1 = __importDefault(require("../../../controllers/Products/Ratings/BaseRatingController"));
const CpuSchema_1 = require("../../../models/Products/Cpu/CpuSchema");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const router = express_1.default.Router();
const cpuProduct = new Cpus_1.default();
const BaseRating = new BaseRatingController_1.default(CpuSchema_1.CpuProduct);
router.get('/', cpuProduct.getAllCpuItemController);
router.get('/filter-data', cpuProduct.getCpuFilterData);
router.get('/details', cpuProduct.getCpuDetailsController);
// Ratings
router.get('/get-cpu-rates', BaseRating.getRatingSummaryController);
router.get('/get-cpu-comments', BaseRating.getAllComments);
router.post('/rate-cpu', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.rateProductController);
router.post('/cpu-comment-like', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.likeDislikeCommentController);
router.delete('/cpu-comment-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeUsersRatingController);
// Rating Answers
router.post('/save-cpu-answer', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.saveAnswerController);
router.delete('/cpu-answer-remove', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, BaseRating.removeSingleCommentAnswer);
module.exports = router;
