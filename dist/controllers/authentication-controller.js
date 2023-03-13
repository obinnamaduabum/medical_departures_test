"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const express_validator_1 = require("express-validator");
const api_response_util_1 = require("../utils/api-response-util");
const authentication_utils_1 = require("../modules/auth/authentication_utils");
const auth_service_1 = require("../service/auth_service");
const user_service_1 = require("../service/user_service");
class AuthenticationController {
    static logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return authentication_utils_1.AuthenticationUtils.logout(res);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
    static me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = yield authentication_utils_1.AuthenticationUtils.verifyTokenForMe(req, res);
                if (verifyToken === null) {
                    return api_response_util_1.ApiResponseUtil.unAuthenticated(res, 'session or token expired, kindly login again');
                }
                else if (verifyToken === 'cookieNotFound') {
                    return api_response_util_1.ApiResponseUtil.unAuthenticated(res, 'kindly login again');
                }
                const user = yield user_service_1.UserService.findById(verifyToken.id);
                if (!user) {
                    return api_response_util_1.ApiResponseUtil.unAuthenticated(res);
                }
                return api_response_util_1.ApiResponseUtil.ok(res, true, '', user);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
    static authenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, '', errors);
                }
                const { email, password } = req.body;
                return auth_service_1.AuthService.authenticateUser(password, email, res, req);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
