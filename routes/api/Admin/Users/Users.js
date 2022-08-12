"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthenticateAccessOrRefreshTokens_1 = require("../../../../middlewares/AuthenticateAccessOrRefreshTokens");
const Users_1 = require("../../../../controllers/Admin/Users/Users");
const RemoveController_1 = require("../../../../controllers/Admin/Users/RemoveController");
const router = (0, express_1.Router)();
router.get('/get-all', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, Users_1.getAllUsers);
router.get('/get-all-rating', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, Users_1.getAllRatingValuesByUserID);
router.delete('/delete', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, RemoveController_1.removeSingleUser);
router.delete('/delete-comment', AuthenticateAccessOrRefreshTokens_1.checkUserIsAdmin, RemoveController_1.removeUserSingleCommentFromProduct);
module.exports = router;
