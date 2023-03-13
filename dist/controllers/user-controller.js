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
exports.UsersController = void 0;
const express_validator_1 = require("express-validator");
const api_response_util_1 = require("../utils/api-response-util");
const user_service_1 = require("../service/user_service");
const user_dao_1 = require("../dao/user_dao");
class UsersController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, '', errors);
                }
                const { userName, email, lastName, firstName, otherName, password } = req.body;
                const userModel = {
                    userName: userName,
                    email: email,
                    lastName: lastName,
                    firstName: firstName,
                    otherName: otherName,
                    password: password,
                };
                if (userModel.email) {
                    const userEmailExists = yield user_dao_1.UserDao.checkIfEmailExists(userModel.email.trim());
                    if (userEmailExists.length > 0) {
                        return api_response_util_1.ApiResponseUtil.badRequest(res, 'email already exists');
                    }
                }
                if (userModel.userName) {
                    const userUserNameExists = yield user_dao_1.UserDao.checkIfUsernameExists(userModel.userName);
                    if (userUserNameExists.length > 0) {
                        return api_response_util_1.ApiResponseUtil.badRequest(res, 'username already exists');
                    }
                }
                const user = yield user_service_1.UserService.createUser(userModel);
                if (user) {
                    return api_response_util_1.ApiResponseUtil.createRequest(res, 'user successfully registered', user);
                }
                else {
                    return api_response_util_1.ApiResponseUtil.InternalServerError(res, null, 'An error occurred during registration');
                }
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
}
exports.UsersController = UsersController;
