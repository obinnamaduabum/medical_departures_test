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
exports.PostController = void 0;
const api_response_util_1 = require("../utils/api-response-util");
const post_model_1 = require("../model/post_model");
const express_validator_1 = require("express-validator");
const authentication_utils_1 = require("../modules/auth/authentication_utils");
const post_service_1 = require("../service/post_service");
const my_util_1 = require("../utils/my_util");
class PostController {
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = yield authentication_utils_1.AuthenticationUtils.verifyTokenForMe(req, res);
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, '', errors);
                }
                const { title, content } = req.body;
                const postModel = new post_model_1.PostModel(title, content, verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.id);
                const post = yield post_service_1.PostService.create(postModel);
                return api_response_util_1.ApiResponseUtil.createRequest(res, 'Blog post created', post);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = yield authentication_utils_1.AuthenticationUtils.verifyTokenForMe(req, res);
                const idAsString = req.params['id'];
                if (!idAsString) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                const id = my_util_1.MyUtils.stringToNumber(idAsString);
                if (!id) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, '', errors);
                }
                const { title, content } = req.body;
                let post = yield post_service_1.PostService.findById(id);
                const user = yield post.getUser();
                if (user.id !== verifyToken.id) {
                    return api_response_util_1.ApiResponseUtil.forbidden(res, false, 'No access to perform operation');
                }
                post = yield post_service_1.PostService.updatePost(id, title, content);
                return api_response_util_1.ApiResponseUtil.ok(res, true, 'Blog post updated', post);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idAsString = req.params['id'];
                if (!idAsString) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                const result = my_util_1.MyUtils.stringToNumber(idAsString);
                if (!result) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                yield post_service_1.PostService.deleteById(result);
                return api_response_util_1.ApiResponseUtil.ok(res, true, 'Blog post deleted');
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
    static viewPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idAsString = req.params['id'];
                if (!idAsString) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                const result = my_util_1.MyUtils.stringToNumber(idAsString);
                if (!result) {
                    return api_response_util_1.ApiResponseUtil.badRequest(res, 'id is required');
                }
                const post = yield post_service_1.PostService.findById(result);
                if (!post) {
                    return api_response_util_1.ApiResponseUtil.notFound(res, 'Blog not found');
                }
                return api_response_util_1.ApiResponseUtil.ok(res, true, 'Blog found', post);
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.InternalServerError(res, e);
            }
        });
    }
}
exports.PostController = PostController;
