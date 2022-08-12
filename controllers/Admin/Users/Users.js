"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRatingValuesByUserID = exports.getAllUsers = void 0;
const User_1 = require("../../../models/User/User");
const RatingsHelper_1 = require("./Helper/RatingsHelper");
/**
 * Felhasználók kezelése
 * - Felhasználók listázása,
 * - Rendelések listázása, státusz megváltoztatása pl (feldolgozás alatt, feldolgozva, elküldve stb)
 * - Vissza kéne úgy küldeni a ratingValuest, hogy a key a termék ID legyen (vagy benne legyen a termék ID)
 */
const getAllUsers = async (request, response) => {
    try {
        const allUsers = await User_1.User.find().select({ userName: 1, email: 1, isAdmin: 1, isEmailConfirmed: 1 });
        response.status(200).json(allUsers);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllUsers = getAllUsers;
const getAllRatingValuesByUserID = async (request, response) => {
    try {
        const userId = request.query.userID;
        if (!userId) {
            return response.status(404).json({ msg: 'Nincs userID' });
        }
        const allUserRatings = await (0, RatingsHelper_1.returnAllUserRatingsByProductType)(userId);
        return response.status(200).json(allUserRatings);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.getAllRatingValuesByUserID = getAllRatingValuesByUserID;
// https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
// https://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection
