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
exports.UserDao = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../entity/user");
const mysql_db_1 = require("../database/mysql_db");
class UserDao {
    static checkIfUsernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mysql_db_1.mySqlDatabase.query(`SELECT u.username from user as u WHERE lower(u.username) = :username; `, {
                replacements: {
                    username: username,
                },
                mapToModel: false,
                type: sequelize_1.QueryTypes.SELECT
            });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                return yield mysql_db_1.mySqlDatabase.query(`SELECT * from user as u WHERE lower(u.email) = :email;`, {
                    replacements: {
                        email: email,
                    },
                    model: user_1.User,
                    mapToModel: true,
                    type: sequelize_1.QueryTypes.SELECT,
                    plain: true,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                return yield mysql_db_1.mySqlDatabase.query(`SELECT * from user as u WHERE u.id = :id;`, {
                    replacements: {
                        id: id,
                    },
                    model: user_1.User,
                    mapToModel: true,
                    type: sequelize_1.QueryTypes.SELECT,
                    plain: true,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static checkIfEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mysql_db_1.mySqlDatabase.query(`SELECT u.email from user as u WHERE lower(u.email) = :email; `, {
                replacements: {
                    email: email,
                },
                mapToModel: false,
                type: sequelize_1.QueryTypes.SELECT
            });
        });
    }
    static checkIfPhoneNumberExists(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.User.findOne({ where: {
                    phoneNumber: phoneNumber.toString().toLocaleLowerCase()
                } });
        });
    }
    static saveUser(userModel) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.User.create({
                firstName: userModel.firstName.toLocaleLowerCase(),
                lastName: userModel.lastName.toLocaleLowerCase(),
                otherName: ((_a = userModel === null || userModel === void 0 ? void 0 : userModel.otherName) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) || "",
                username: userModel.userName.toLocaleLowerCase(),
                email: userModel.email.toLocaleLowerCase(),
                password: userModel.password
            });
        });
    }
}
exports.UserDao = UserDao;
