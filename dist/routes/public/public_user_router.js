"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user-controller");
const express_validator_1 = require("express-validator");
class PublicUserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post('/create', [
            (0, express_validator_1.body)('userName', 'username required').exists(),
            (0, express_validator_1.body)('email', 'email required or invalid').exists().isEmail(),
            (0, express_validator_1.body)('firstName', 'firstname required').exists(),
            (0, express_validator_1.body)('lastName', 'lastname required').exists(),
            (0, express_validator_1.body)('otherName', 'other name required').exists(),
            (0, express_validator_1.body)('password', 'password required').not().isEmpty().exists(),
        ], user_controller_1.UsersController.signUp);
    }
}
exports.default = PublicUserRouter;
