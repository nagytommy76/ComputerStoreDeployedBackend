"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseProduct {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    returnProductModelWithPaginateInfoWithoutDetails = async (request, extraFilerParameters = {}) => {
        const currentPage = parseInt(request.query.currentPage) || 1;
        const perPage = parseInt(request.query.perPage) || 12;
        const orderBy = request.query.orderBy || 'asc';
        const byManufacturer = request.query.byManufacturer === 'all' ? '' : request.query.byManufacturer;
        const warranty = request.query.selectedWarranty.trim();
        const byWarranty = warranty === 'all' ? null : { 'details.warranity': warranty };
        const priceRange = this.splitStringAndConvertToArray(request.query.priceRange);
        let totalPages;
        const foundProduct = await this.productModel
            .find({
            manufacturer: new RegExp(byManufacturer, 'i'),
            ...byWarranty,
            price: { $gte: priceRange[0], $lte: priceRange[1] },
            ...extraFilerParameters,
        })
            .select('price manufacturer type typeCode pictureUrls ratingValues._id')
            .sort({ price: orderBy })
            .lean();
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = currentPage * perPage;
        const pagedProducts = foundProduct.slice(startIndex, endIndex);
        totalPages = Math.ceil(foundProduct.length / perPage);
        return { foundProduct: pagedProducts, totalPages };
    };
    returnProductDetails = async (productId) => {
        const foundProductDetails = await this.productModel
            .findById(productId)
            .select('type typeCode pictureUrls price manufacturer details')
            .sort({ 'details.chartData.timpestamp': 1 })
            .lean();
        return foundProductDetails;
    };
    baseFilterData = async (extraGroupParameters = {}) => {
        const filterDataGroup = await this.productModel.aggregate().group({
            _id: null,
            maxPrice: { $max: '$price' },
            minPrice: { $min: '$price' },
            allManufacturers: { $addToSet: '$manufacturer' },
            allWarranties: { $addToSet: '$details.warranity' },
            ...extraGroupParameters,
        });
        filterDataGroup[0].allManufacturers.sort();
        return filterDataGroup;
    };
    splitStringAndConvertToArray = (stringToSplit, separator = ',') => {
        return stringToSplit.split(separator);
    };
}
exports.default = BaseProduct;
