"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index-controller");
const swagger_1 = require("../doc/swagger");
const swaggerUi = require('swagger-ui-express');
class IndexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get('/', index_controller_1.IndexController.index);
        this.router.use('/api-docs', swaggerUi.serve);
        this.router.get('/api-docs', swaggerUi.setup(swagger_1.swaggerDocument));
    }
}
exports.default = IndexRouter;
