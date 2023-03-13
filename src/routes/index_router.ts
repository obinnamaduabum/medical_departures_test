import { Router } from "express";
import { IndexController } from "../controllers/index-controller";
import { swaggerDocument, swaggerDocumentForAWS } from "../doc/swagger";
const swaggerUi = require('swagger-ui-express');

class IndexRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/',  IndexController.index);
        this.router.use('/api-docs', swaggerUi.serve);
        const isAWS = process.env.IS_AWS_DEPLOYMENT;
        this.router.get('/api-docs', swaggerUi.setup(isAWS ? swaggerDocumentForAWS : swaggerDocument));
    }
}

export default IndexRouter;
