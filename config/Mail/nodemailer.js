"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("./handlebars"));
const endpoints_config_1 = require("../endpoints.config");
class NodeMailer extends handlebars_1.default {
    EMAIL_TOKEN_EXPIRESIN;
    host;
    port;
    transporter;
    mailUser;
    mailPass;
    senderAddress;
    constructor() {
        super();
        this.senderAddress = '"Comuter Store 👻" <computer@store.hu>';
        this.EMAIL_TOKEN_EXPIRESIN = '15';
        this.mailUser = process.env.MAIL_USERNAME;
        this.mailPass = process.env.MAIL_PASSWORD;
        this.host = process.env.MAIL_HOST;
        this.port = process.env.MAIL_PORT;
        this.transporter = nodemailer_1.default.createTransport({
            host: this.host,
            port: this.port,
            auth: {
                user: this.mailUser,
                pass: this.mailPass,
            },
        });
    }
    async sendEmailUserRegistersAndResendEmail(to, subject, userName, confirmationCode) {
        const renderedHtml = this.renderAnyMjmlToPlainHtml('Auth/Register', {
            userName,
            EMAIL_TOKEN_EXPIRESIN: this.EMAIL_TOKEN_EXPIRESIN,
            confirmationPath: `${endpoints_config_1.URL_PATH}email-confirm/${confirmationCode}`,
        });
        let info = await this.transporter.sendMail({
            from: this.senderAddress,
            to,
            subject,
            html: renderedHtml,
        });
        return info;
    }
    async sendEmailAfterUserOrder(userEmail, products, itemId, orderDate, totalPrice, deliveryPrice, userName, orderID) {
        try {
            const renderedEmail = this.renderAnyMjmlToPlainHtml('Orders/Orders', {
                EMAIL_TOKEN_EXPIRESIN: this.EMAIL_TOKEN_EXPIRESIN,
                products,
                itemId,
                orderDate,
                totalPrice,
                deliveryPrice,
                orderID,
                userName,
            });
            let emailInformation = await this.transporter.sendMail({
                from: this.senderAddress,
                to: userEmail,
                subject: 'Rendelésed összegzése',
                html: renderedEmail,
            });
            return emailInformation;
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendResetPasswordLinkEmail(validationLink, userEmail) {
        try {
            const renderedEmail = this.renderAnyMjmlToPlainHtml('Auth/ForgotPass', { validationLink });
            let emailInfo = await this.transporter.sendMail({
                from: this.senderAddress,
                to: userEmail,
                subject: 'Elfelejtett jelszó',
                html: renderedEmail,
            });
            return emailInfo;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = NodeMailer;
