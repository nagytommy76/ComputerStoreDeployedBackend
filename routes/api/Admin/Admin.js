"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../middlewares/AuthenticateAccessOrRefreshTokens");
const router = express_1.default.Router();
router.get('/check-is-admin', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, (req, res) => {
    return res.status(200).json({ msg: 'is admin' });
});
module.exports = router;
