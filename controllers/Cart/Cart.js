"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increadeDecreaseItemQtyController = exports.removeItemController = exports.addCartItemsToUserController = exports.fillDBWithCartItemsAfterLoginController = exports.fetchUserCartItemsController = void 0;
const CartHelper_1 = require("./CartHelper");
const fetchUserCartItemsController = async (req, res) => {
    try {
        res.status(200).json(req.foundUser.cartItems);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.fetchUserCartItemsController = fetchUserCartItemsController;
// Ha a felhasználó nincs bejelentkezve és tesz valamit a kosarába
const fillDBWithCartItemsAfterLoginController = async (req, res) => {
    try {
        const { foundUser } = req;
        foundUser.cartItems = req.body.cartItems;
        foundUser.save();
        return res.status(200).json({ message: 'Sikeres bevitel az adatbázisba!' });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.fillDBWithCartItemsAfterLoginController = fillDBWithCartItemsAfterLoginController;
const addCartItemsToUserController = async (req, res) => {
    try {
        const { foundUser } = req;
        const productId = req.body._id;
        const ItemQuantity = req.body.quantity;
        if (ItemQuantity === null || ItemQuantity <= 0)
            return res.status(404).json({ message: 'Helytelen mennyiség' });
        let toSaveOrModifyObject = {
            itemId: productId,
            quantity: ItemQuantity,
            productType: req.body.productType,
            displayImage: req.body.displayImage,
            displayName: req.body.displayName,
            price: req.body.price,
        };
        // Van ilyen indexes elem a kosarában
        const itemFoundIndex = (0, CartHelper_1.findUsersCartItemIndex)(foundUser.cartItems, productId);
        const foundItem = (0, CartHelper_1.findSingleItemInUsersCartItem)(foundUser.cartItems, productId);
        if (itemFoundIndex !== -1 && foundItem !== undefined) {
            foundUser.cartItems.splice(itemFoundIndex, 1, toSaveOrModifyObject);
        }
        else {
            foundUser.cartItems.push(toSaveOrModifyObject);
        }
        foundUser.save();
        return res.status(201).json({ message: 'Termék mentve a kosárba!' });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.addCartItemsToUserController = addCartItemsToUserController;
const removeItemController = async (req, res) => {
    const { foundUser } = req;
    const foundIndex = (0, CartHelper_1.findUsersCartItemIndex)(foundUser.cartItems, req.body._id);
    if (foundIndex >= 0)
        foundUser.cartItems.splice(foundIndex, 1);
    foundUser.save();
    return res.status(200).json({ message: 'Sikeresen törölve!' });
};
exports.removeItemController = removeItemController;
const increadeDecreaseItemQtyController = async (req, res) => {
    const requestData = req.body.data;
    const { foundUser } = req;
    const itemFoundIndex = (0, CartHelper_1.findUsersCartItemIndex)(foundUser.cartItems, requestData.itemId);
    const foundItem = (0, CartHelper_1.findSingleItemInUsersCartItem)(foundUser.cartItems, requestData.itemId);
    if (itemFoundIndex !== -1 && foundItem !== undefined) {
        if (requestData.isIncrease)
            foundItem.quantity++;
        else
            foundItem.quantity--;
        foundUser.cartItems.splice(itemFoundIndex, 1, foundItem);
    }
    foundUser.save();
    return res.status(200).json({ message: 'mennyiség sikeresen módosítva' });
};
exports.increadeDecreaseItemQtyController = increadeDecreaseItemQtyController;
