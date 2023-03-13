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
exports.UserService = void 0;
const mysql_db_1 = require("../database/mysql_db");
const bcrypt_password_util_1 = require("../utils/bcrypt-password-util");
const user_model_1 = require("../model/user_model");
const user_1 = require("../entity/user");
const user_dao_1 = require("../dao/user_dao");
class UserService {
    static createUser(userInput) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield mysql_db_1.mySqlDatabase.transaction();
            try {
                const saltRounds = 10;
                if (!userInput.password) {
                    throw new Error();
                }
                const encryptedPassword = yield bcrypt_password_util_1.BcryptPasswordUtil.getHashedPassword(userInput.password, saltRounds);
                if (!encryptedPassword) {
                    throw new Error();
                }
                let userModel = new user_model_1.UserModel(userInput.firstName, userInput.lastName, userInput === null || userInput === void 0 ? void 0 : userInput.otherName, userInput.firstName + userInput.lastName, (_a = userInput === null || userInput === void 0 ? void 0 : userInput.email) === null || _a === void 0 ? void 0 : _a.toLowerCase(), encryptedPassword);
                const otherName = ((_b = userModel === null || userModel === void 0 ? void 0 : userModel.otherName) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase()) || "";
                const userData = {
                    firstName: userModel.firstName.toLocaleLowerCase(),
                    lastName: userModel.lastName.toLocaleLowerCase(),
                    otherName: otherName,
                    username: userModel.userName,
                    email: userModel.email.toLocaleLowerCase(),
                    password: userModel.password,
                    date_created: new Date(),
                    date_updated: new Date()
                };
                const user = yield user_1.User.create(userData, { transaction: transaction });
                yield transaction.commit();
                return user;
            }
            catch (e) {
                console.log(e);
                yield transaction.rollback();
            }
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_1.UserDao.findByEmail(email);
            if (user) {
                return user;
            }
            return null;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_dao_1.UserDao.findById(id);
            if (users) {
                return users;
            }
            return null;
        });
    }
}
exports.UserService = UserService;
