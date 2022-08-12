"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const CheckUserIsFound_1 = require("../../../middlewares/CheckUserIsFound");
const Cart_1 = require("../../../controllers/Cart/Cart");
const router = express_1.default.Router();
router.get('/fetch-items', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, Cart_1.fetchUserCartItemsController);
router.post('/add-items', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, Cart_1.addCartItemsToUserController);
router.post('/fill-items', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, Cart_1.fillDBWithCartItemsAfterLoginController);
router.patch('/quantity', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, Cart_1.increadeDecreaseItemQtyController);
router.delete('/remove-item', AuthenticateAccessOrRefreshTokens_1.authenticateAccessToken, CheckUserIsFound_1.checkUserIsFound, Cart_1.removeItemController);
module.exports = router;
