"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../../controllers/authentication-controller");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
class PublicAuthenticationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', [
            (0, express_validator_1.body)('email', 'email required').exists().isEmail(),
            (0, express_validator_1.body)('password', 'password required').exists()
        ], authentication_controller_1.AuthenticationController.authenticateUser);
    }
}
exports.default = PublicAuthenticationRouter;
