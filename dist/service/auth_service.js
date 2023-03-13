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
exports.AuthService = void 0;
const bcrypt_password_util_1 = require("../utils/bcrypt-password-util");
const authentication_utils_1 = require("../modules/auth/authentication_utils");
const api_response_util_1 = require("../utils/api-response-util");
const user_service_1 = require("./user_service");
class AuthService {
    static authenticateUser(password, email, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.findByEmail(email);
            if (!user) {
                return api_response_util_1.ApiResponseUtil.unAuthenticated(res, 'email or password is invalid');
            }
            const isPasswordValid = yield bcrypt_password_util_1.BcryptPasswordUtil.compare(password, user.password);
            if (isPasswordValid) {
                const token = authentication_utils_1.AuthenticationUtils.generateToken(user.id);
                let hostName = '';
                if (req.headers.host) {
                    hostName = req.headers.host;
                }
                authentication_utils_1.AuthenticationUtils.setCookie(token, res, hostName, req);
                return api_response_util_1.ApiResponseUtil.ok(res, true, 'token successfully generated', token);
            }
            return api_response_util_1.ApiResponseUtil.ok(res, false, 'email or password invalid');
        });
    }
}
exports.AuthService = AuthService;
