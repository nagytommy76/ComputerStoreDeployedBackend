"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mjml_1 = __importDefault(require("mjml"));
const handlebars_1 = require("handlebars");
const endpoints_config_1 = require("../endpoints.config");
class Handlebars {
    renderAnyMjmlToPlainHtml(renderEmailFolderAndName, contextObject) {
        const readMjmlAsString = fs_1.default.readFileSync(`./views/${renderEmailFolderAndName}.mjml`, 'utf8');
        const renderedText = (0, handlebars_1.compile)(readMjmlAsString, { strict: true });
        const mjmlText = renderedText({
            URL_PATH: endpoints_config_1.URL_PATH,
            ...contextObject,
        });
        const html = (0, mjml_1.default)(mjmlText);
        return html.html;
    }
}
exports.default = Handlebars;
// https://stackoverflow.com/questions/43111628/mjml-template-interpolation-dynamic-data-context
// https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options
