"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticateAccessOrRefreshTokens_1 = require("../../../../middlewares/AuthenticateAccessOrRefreshTokens");
const AdminVgaController_1 = require("../../../../controllers/Admin/Vga/AdminVgaController");
const AdminVgaValidator_1 = require("./Validators/AdminVgaValidator");
const CheckValidationErrors_1 = require("../../../../middlewares/CheckValidationErrors");
const router = express_1.default.Router();
router.get('/get-all', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminVgaController_1.getAllVgaItemsController);
router.get('/get-to-delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminVgaController_1.getAllVgaItemsForDeleteController);
router.post('/insert', AdminVgaValidator_1.insertVgaValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, AdminVgaController_1.insertVgaItemController);
router.post('/modify', AdminVgaValidator_1.modifyVgaValidator, AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, CheckValidationErrors_1.checkErrors, AdminVgaController_1.modifyVgaProductController);
router.delete('/delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, AdminVgaController_1.deleteVgaProductByIdController);
module.exports = router;
