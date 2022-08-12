"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../../middlewares/AuthenticateAccessOrRefreshTokens");
const Memory_1 = require("../../../../controllers/Admin/Memory/Memory");
const MemoryValidator_1 = require("./Validator/MemoryValidator");
const CheckValidationErrors_1 = require("../../../../middlewares/CheckValidationErrors");
const router = express_1.default.Router();
router.get('/get-all', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, Memory_1.getAllMemoryController);
router.get('/get-to-delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, Memory_1.getAllMemoryItemsForDeleteController);
router.post('/insert', MemoryValidator_1.insertMemoryValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, Memory_1.insertMemoryProduct);
router.post('/modify', MemoryValidator_1.insertMemoryValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, Memory_1.modifyMemoryProductController);
router.delete('/delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, Memory_1.deleteMemoryProductByIdController);
module.exports = router;
