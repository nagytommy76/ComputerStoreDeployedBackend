"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIsFound = void 0;
const User_1 = require("../models/User/User");
const checkUserIsFound = async (req, res, next) => {
    const foundUser = await User_1.User.findById(req.user?._id);
    if (foundUser == null)
        return res.status(404).json({ message: 'Felhasználó nem található!' });
    req.foundUser = foundUser;
    next();
};
exports.checkUserIsFound = checkUserIsFound;
