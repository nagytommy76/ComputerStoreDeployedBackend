"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: [true, 'Adjon meg egy jelszót!'],
        minlength: [6, 'a jelszó min. 6 karakter legyen!'],
    },
    email: {
        type: String,
        required: [true, 'Adjon meg egy email címet!'],
        unique: true,
        lowercase: true,
    },
    isAdmin: { type: Boolean, default: false },
}).add({
    isEmailConfirmed: { type: Boolean, default: false },
    orders: [
        {
            orderedAt: { type: Date, default: new Date() },
            totalPrice: { type: Number, default: 0 },
            deliveryType: { type: String, default: '' },
            deliveryPrice: { type: Number, default: 0 },
            paymentMethod: { type: String, default: '' },
            payedAt: { type: Number, default: 0 },
            products: {
                type: [
                    {
                        productID: mongoose_1.Schema.Types.ObjectId,
                        productName: String,
                        productImage: String,
                        productQty: Number,
                        productPrice: Number,
                        productType: String,
                    },
                ],
            },
        },
    ],
    userDetails: {
        firstName: String,
        lastName: String,
        phone: String,
        address: {
            zipCode: Number,
            city: String,
            street: String,
            houseNumber: String,
            floor: String,
            door: String,
        },
    },
    cartItems: [
        {
            itemId: String,
            displayImage: String,
            displayName: String,
            price: Number,
            quantity: Number,
            productType: String,
        },
    ],
});
UserSchema.statics.register = async function (email, userName, firstPassword) {
    if (!email || !userName || !firstPassword)
        throw Error('Adj meg egy email címet, felhasználónevet és jelszót!');
    const checkUserRegisteredWithEmail = await this.findOne({ $or: [{ userName }, { email }] });
    if (checkUserRegisteredWithEmail !== null)
        throw Error('Az email cím vagy felhasználónév már regisztrálva lett');
};
UserSchema.statics.login = async function (userNameOrEmail) {
    const user = await this.findOne({ $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }] });
    if (!user)
        throw Error('Nincs regisztrálva felhasználó ezzel az email címmel');
    return user;
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
