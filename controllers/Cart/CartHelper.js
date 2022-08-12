"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExists = exports.findSingleItemInUsersCartItem = exports.findUsersCartItemIndex = void 0;
const User_1 = require("../../models/User/User");
const findUsersCartItemIndex = (cartItems, productId) => {
    return cartItems.findIndex((cartItem) => cartItem.itemId == productId);
};
exports.findUsersCartItemIndex = findUsersCartItemIndex;
const findSingleItemInUsersCartItem = (cartItems, productId) => {
    return cartItems.find((cartItem) => cartItem.itemId == productId);
};
exports.findSingleItemInUsersCartItem = findSingleItemInUsersCartItem;
const checkUserExists = async (req, res) => {
    const userEmail = req.user?.email;
    const foundUser = await User_1.User.findOne({ email: userEmail }, 'cartItems');
    return foundUser;
};
exports.checkUserExists = checkUserExists;
