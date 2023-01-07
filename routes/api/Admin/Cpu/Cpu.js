"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../../middlewares/AuthenticateAccessOrRefreshTokens");
const AdminCpuController_1 = require("../../../../controllers/Admin/Cpu/AdminCpuController");
const CpuValidator_1 = require("./Validator/CpuValidator");
const CheckValidationErrors_1 = require("../../../../middlewares/CheckValidationErrors");
const router = express_1.default.Router();
router.get('/get-all', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminCpuController_1.getAllCpuItemsController);
router.get('/get-to-delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminCpuController_1.getAllCpuItemsForDeleteController);
router.post('/insert', CpuValidator_1.insertCpuValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, AdminCpuController_1.insertCpuController);
router.patch('/modify', CpuValidator_1.insertCpuValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, AdminCpuController_1.modifyCpuProductController);
router.delete('/delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminCpuController_1.deleteCpuProductByIdController);
module.exports = router;
