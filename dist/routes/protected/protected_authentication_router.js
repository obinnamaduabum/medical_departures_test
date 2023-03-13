"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../../controllers/authentication-controller");
const express_1 = require("express");
const authentication_utils_1 = require("../../modules/auth/authentication_utils");
class ProtectedAuthenticationRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/me', authentication_utils_1.AuthenticationUtils.checkIfAuthenticated, authentication_controller_1.AuthenticationController.me);
        this.router.get('/logout', authentication_utils_1.AuthenticationUtils.checkIfAuthenticated, authentication_controller_1.AuthenticationController.logOut);
    }
}
exports.default = ProtectedAuthenticationRouter;
