"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("../../config/Mail/nodemailer"));
const User_1 = require("../../models/User/User");
const CpuSchema_1 = require("../../models/Products/Cpu/CpuSchema");
const VgaProduct_1 = require("../../models/Products/Vga/VgaProduct");
const Memory_1 = require("../../models/Products/Memory/Memory");
const HDD_1 = require("../../models/Products/HDD/HDD");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
class UserOrders extends nodemailer_1.default {
    constructor() {
        super();
    }
    handleUserOrderWithCardOrCashPaymentController = async (req, res) => {
        try {
            const { id, amount, paymentMethod, deliveryType, deliveryPrice } = req.body;
            const foundUser = await User_1.User.findById(req.user?._id);
            if (foundUser) {
                const currentItemsInCart = this.getCurrentCartItemsFromFoundUser(foundUser);
                const orderedAt = new Date();
                let payedAt = 0;
                if (paymentMethod == 'stripeCard') {
                    const { created } = await stripe.paymentIntents.create({
                        currency: 'huf',
                        amount: amount + deliveryPrice,
                        description: 'Computer Store pet project',
                        confirm: true,
                        payment_method: id,
                    });
                    payedAt = created;
                }
                foundUser.orders.push({
                    payedAt,
                    orderedAt,
                    paymentMethod,
                    totalPrice: amount,
                    deliveryType,
                    deliveryPrice,
                    products: currentItemsInCart,
                });
                const foundLastOrderId = foundUser.orders[foundUser.orders.length - 1]._id;
                const foundUserJson = foundUser.toJSON();
                await this.sendEmailAfterUserOrder(foundUserJson.email, foundUserJson.cartItems, 'termék ID', `${orderedAt.toLocaleDateString()} ${orderedAt.toLocaleTimeString()}`, amount + deliveryPrice, deliveryPrice, foundUser.userName, foundLastOrderId);
                // Módosítom az összes kosárban lévő termék stockQty-jét
                await this.modifyProductStockQtyAfterOrder(foundUser.cartItems);
                foundUser.cartItems = [];
                await foundUser.save();
                return res.status(200).json({ orderSuccess: true, paymentSuccess: true, result: foundUser });
            }
            return res
                .status(404)
                .json({ msg: 'A felhasználó nem található', orderSuccess: false, paymentSuccess: false });
        }
        catch (error) {
            return res.status(500).json({ error, orderSuccess: false, paymentSuccess: false });
        }
    };
    getUserOrders = async (request, response) => {
        try {
            const foundUserOrders = (await User_1.User.findById(request.user?._id)
                .select('orders')
                .lean());
            if (foundUserOrders) {
                response.status(200).json(foundUserOrders.orders.reverse()); // Megfordítom, hogy a legújabb legyen legelöl
            }
        }
        catch (error) {
            response.status(500).json({ error });
        }
    };
    modifyProductStockQtyAfterOrder = async (cartItems) => {
        cartItems.map(async (cart) => {
            switch (cart.productType) {
                case 'cpu':
                    const foundCpuItem = await CpuSchema_1.CpuProduct.findById(cart.itemId).select('inStockQuantity');
                    if (foundCpuItem) {
                        this.determineTheQuantity(foundCpuItem, cart.quantity);
                    }
                    break;
                case 'vga':
                    const foundVgaItem = await VgaProduct_1.VgaProduct.findById(cart.itemId).select('inStockQuantity');
                    if (foundVgaItem) {
                        this.determineTheQuantity(foundVgaItem, cart.quantity);
                    }
                    break;
                case 'memory':
                    const foundMemoryItem = await Memory_1.MemoryProduct.findById(cart.itemId).select('inStockQuantity');
                    if (foundMemoryItem) {
                        this.determineTheQuantity(foundMemoryItem, cart.quantity);
                    }
                    break;
                case 'hdd':
                    const foundHDDItem = await HDD_1.HddProduct.findById(cart.itemId).select('inStockQuantity');
                    if (foundHDDItem) {
                        this.determineTheQuantity(foundHDDItem, cart.quantity);
                    }
                    break;
            }
        });
    };
    determineTheQuantity = (foundItem, currentCartItemQty) => {
        const afterPurchaseQuantityinDataBase = foundItem.inStockQuantity - currentCartItemQty;
        if (afterPurchaseQuantityinDataBase >= 0) {
            foundItem.inStockQuantity = afterPurchaseQuantityinDataBase;
            foundItem.save();
        }
        else {
            // Kifogyott a készlet, rendelni kell stb......
            foundItem.inStockQuantity = 0;
            foundItem.save();
        }
    };
    getCurrentCartItemsFromFoundUser = (foundUser) => {
        const currentItemsInCart = foundUser.cartItems.map(product => {
            return {
                productID: product.itemId,
                productImage: product.displayImage,
                productName: product.displayName,
                productQty: product.quantity,
                productPrice: product.price,
                productType: product.productType,
            };
        });
        return currentItemsInCart;
    };
}
exports.default = UserOrders;
