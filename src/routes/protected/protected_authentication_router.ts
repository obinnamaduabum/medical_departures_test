import { AuthenticationController } from "../../controllers/authentication-controller";
import { Router } from 'express';
import { AuthenticationUtils } from "../../modules/auth/authentication_utils";

class ProtectedAuthenticationRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/me', AuthenticationUtils.checkIfAuthenticated, AuthenticationController.me);
        this.router.get('/logout', AuthenticationUtils.checkIfAuthenticated, AuthenticationController.logOut);
    }
}

export default ProtectedAuthenticationRouter;
