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
exports.BcryptPasswordUtil = void 0;
const bCrypt = require('bcryptjs');
class BcryptPasswordUtil {
    static compare(inputPassword, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                bCrypt.compare(inputPassword, password, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    }
    static getHashedPassword(password, saltRounds) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                bCrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        reject(null);
                    }
                    resolve(hash);
                });
            });
        });
    }
}
exports.BcryptPasswordUtil = BcryptPasswordUtil;
