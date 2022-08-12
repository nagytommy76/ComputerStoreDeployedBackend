"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const endpoints_config_1 = require("./endpoints.config");
const connectDB = async () => {
    try {
        mongoose_1.default.set('useCreateIndex', true);
        const connection = await mongoose_1.default.connect(endpoints_config_1.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
exports.default = connectDB;
