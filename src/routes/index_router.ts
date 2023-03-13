import { Router } from "express";
import { IndexController } from "../controllers/index-controller";
import { swaggerDocument } from "../doc/swagger";
const swaggerUi = require('swagger-ui-express');

class IndexRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/',  IndexController.index);
        this.router.use('/api-docs', swaggerUi.serve);
        this.router.get('/api-docs', swaggerUi.setup(swaggerDocument));
    }
}

export default IndexRouter;
