"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const CheckUserIsFound_1 = require("../../../middlewares/CheckUserIsFound");
const Orders_1 = __importDefault(require("../../../controllers/User/Orders"));
const userOrders = new Orders_1.default();
const router = express_1.default.Router();
router.post('/handle-order', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, userOrders.handleUserOrderWithCardOrCashPaymentController);
router.get('/get-orders', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, userOrders.getUserOrders);
module.exports = router;
