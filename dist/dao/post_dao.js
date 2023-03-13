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
exports.PostDao = void 0;
const sequelize_1 = require("sequelize");
const mysql_db_1 = require("../database/mysql_db");
const post_1 = require("../entity/post");
class PostDao {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                return yield mysql_db_1.mySqlDatabase.query(`SELECT * from post as p WHERE p.id = :id;`, {
                    replacements: {
                        id: id,
                    },
                    model: post_1.Post,
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
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                return yield mysql_db_1.mySqlDatabase.query(`DELETE from post as p WHERE p.id = :id;`, {
                    replacements: {
                        id: id,
                    },
                    type: sequelize_1.QueryTypes.DELETE,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
    static updateById(id, title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                return yield mysql_db_1.mySqlDatabase.query(`UPDATE post set title = :title, content = :content, date_updated = :dateUpdated where id = :id;`, {
                    replacements: {
                        id: id,
                        title: title,
                        content: content,
                        dateUpdated: new Date()
                    },
                    type: sequelize_1.QueryTypes.UPDATE,
                });
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.PostDao = PostDao;
