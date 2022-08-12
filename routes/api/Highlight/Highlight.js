"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Highlight_1 = require("../../../controllers/Highlight/Highlight");
const router = express_1.default.Router();
router.get('/get-highlight', Highlight_1.HighlightController);
module.exports = router;
