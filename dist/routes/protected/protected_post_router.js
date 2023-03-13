"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../../controllers/post-controller");
const authentication_utils_1 = require("../../modules/auth/authentication_utils");
const express_validator_1 = require("express-validator");
class ProtectedPostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.handlers = [
            authentication_utils_1.AuthenticationUtils.checkIfAuthenticated,
            (0, express_validator_1.body)('title', 'title required').not().isEmpty().exists(),
            (0, express_validator_1.body)('content', 'content required').not().isEmpty().exists(),
        ];
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create', this.handlers, post_controller_1.PostController.createPost);
        this.router.get('/:id', authentication_utils_1.AuthenticationUtils.checkIfAuthenticated, post_controller_1.PostController.viewPost);
        this.router.post('/update/:id', this.handlers, post_controller_1.PostController.updatePost);
        this.router.delete('/remove/:id', authentication_utils_1.AuthenticationUtils.checkIfAuthenticated, post_controller_1.PostController.deletePost);
    }
}
exports.default = ProtectedPostRouter;
