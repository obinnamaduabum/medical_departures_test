import { Authentication } from "../../controllers/authentication-controller";
import { Router } from 'express';
import { body } from "express-validator";

class PublicAuthenticationRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/login', [
            body('email', 'email required').exists().isEmail(),
            body('password', 'password required').exists()
        ], Authentication.authenticateUser);
    }
}

export default PublicAuthenticationRouter;
