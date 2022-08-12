"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canReturnProducts = ({ productModel }) => ({
    getAllProduct: async () => {
        return await productModel.find().lean();
    },
    getProductToModify: async (productID) => {
        return (await productModel.findById(productID));
    },
    getAllToDeleteProducts: async () => {
        const allProductsToDelete = (await productModel
            .find()
            .select(['manufacturer', 'price', 'type', 'inStockQuantity'])
            .lean()
            .sort({ price: 'asc' }));
        return allProductsToDelete;
    },
});
const canInsertDeleteModifyProduct = ({ productModel }) => ({
    insert: async (productDetails, productBase) => {
        const newProductDetails = {
            ...productDetails,
            chartData: [
                {
                    price: productBase.price,
                    timestamp: new Date(),
                },
            ],
        };
        const createdProductToInser = new productModel({
            ...productBase,
            details: newProductDetails,
        });
        return await createdProductToInser.save();
    },
    delete: async (productID) => {
        return productModel.findByIdAndRemove(productID);
    },
    modifyChartData: (details, price) => {
        if (details.chartData === undefined) {
            details.chartData = [
                {
                    price,
                    timestamp: Date.now(),
                },
            ];
        }
        else {
            details.chartData.push({
                price,
                timestamp: Date.now(),
            });
        }
    },
});
function baseAdminController(productModel) {
    // Gyakorlatilag ez a construktor
    const state = {
        productModel,
    };
    return {
        ...state,
        ...canInsertDeleteModifyProduct(state),
        ...canReturnProducts(state),
    };
}
exports.default = baseAdminController;
