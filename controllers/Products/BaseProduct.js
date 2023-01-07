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
        const productName = request.query.productName.trim() || '';
        const productNameRegexString = new RegExp(productName, 'i');
        const orderBy = request.query.orderBy || 'asc';
        const byManufacturer = request.query.byManufacturer === 'all' ? '' : request.query.byManufacturer;
        const warranty = request.query.selectedWarranty.trim();
        const byWarranty = warranty === 'all' ? null : { 'details.warranity': warranty };
        const priceRange = this.splitStringAndConvertToArray(request.query.priceRange);
        let totalPages;
        const foundProduct = await this.productModel
            .find({
            manufacturer: new RegExp(byManufacturer, 'i'),
            $or: [
                { type: productNameRegexString },
                { typeCode: productNameRegexString },
                { itemNumber: productNameRegexString },
            ],
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
        return { foundProduct: pagedProducts, totalPages, totalProductCount: foundProduct.length };
    };
    returnProductDetails = async (productId) => {
        const foundProductDetails = await this.productModel
            .find({ _id: productId })
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
    /**
     * returns an array from the given string separated by something
     * @param stringToSplit string
     * @param separator string @default ','
     * @returns strring[]
     */
    splitStringAndConvertToArray = (stringToSplit, separator = ',') => {
        return stringToSplit.split(separator);
    };
}
exports.default = BaseProduct;
