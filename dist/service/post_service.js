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
exports.PostService = void 0;
const post_1 = require("../entity/post");
const post_dao_1 = require("../dao/post_dao");
class PostService {
    static create(postInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                title: postInput.title,
                content: postInput.content,
                user_id: postInput.user_id,
                date_created: new Date(),
                date_updated: new Date()
            };
            return yield post_1.Post.create(data);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_dao_1.PostDao.findById(id);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_dao_1.PostDao.deleteById(id);
        });
    }
    static updatePost(id, title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_dao_1.PostDao.updateById(id, title, content);
        });
    }
}
exports.PostService = PostService;
