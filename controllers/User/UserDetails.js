"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetailsController = exports.getUserDetailsController = exports.insertUserDetailsController = void 0;
const insertUserDetailsController = async (req, res) => {
    try {
        const foundUser = req.foundUser;
        foundUser.userDetails = req.body.userDetails;
        foundUser.save();
        res.sendStatus(201);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.insertUserDetailsController = insertUserDetailsController;
const getUserDetailsController = async (req, res) => {
    try {
        if (req.foundUser.userDetails.firstName == undefined || req.foundUser.userDetails.firstName == '') {
            return res.status(200).json({ userDetails: null, isDetailsFilled: false });
        }
        return res.status(200).json({ userDetails: req.foundUser.userDetails, isDetailsFilled: true });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getUserDetailsController = getUserDetailsController;
const updateUserDetailsController = async (req, res) => {
    try {
        const foundUser = req.foundUser;
        foundUser.userDetails = req.body.userDetails;
        foundUser.save();
        return res.sendStatus(200);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.updateUserDetailsController = updateUserDetailsController;
