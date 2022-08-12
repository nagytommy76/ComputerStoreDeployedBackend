"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSchemaPropertiesAndTypes = exports.ChartData = exports.ProductRatingValuesSchema = void 0;
const responses = {
    type: [
        {
            userId: { type: String, required: true },
            isLike: { type: Boolean, required: true },
        },
    ],
    required: false,
};
exports.ProductRatingValuesSchema = {
    type: [
        {
            userId: { type: String, required: true },
            userName: { type: String, required: true },
            rating: { type: Number, required: true },
            ratedAt: { type: Date, required: true },
            comment: { type: String, required: false },
            responses,
            commentAnswers: {
                type: [
                    {
                        userId: { type: String, required: true },
                        userName: { type: String, required: true },
                        answer: { type: String, required: true },
                        answeredAt: { type: Date, required: true },
                        responses,
                    },
                ],
                required: false,
            },
        },
    ],
    required: false,
};
exports.ChartData = {
    type: [
        {
            price: Number,
            timestamp: Number,
        },
    ],
};
exports.BaseSchemaPropertiesAndTypes = {
    itemNumber: { type: String },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrls: { type: Array, required: true },
    typeCode: { type: String },
    inStockQuantity: { type: Number, default: 0 },
    isHighlighted: { type: Boolean, default: false },
    ratingValues: exports.ProductRatingValuesSchema,
};
