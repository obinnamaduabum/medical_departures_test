import { Router } from 'express';
import { UsersController } from "../../controllers/user-controller";
import { body } from "express-validator";

class PublicUserRouter {

    public router: Router;

    constructor() {

        this.router = Router();
        this.router.post('/create', [
            body('userName', 'username required').exists(),
            body('email', 'email required or invalid').exists().isEmail(),
            body('firstName', 'firstname required').exists(),
            body('lastName', 'lastname required').exists(),
            body('otherName', 'other name required').exists(),
            body('password', 'password required').not().isEmpty().exists(),
        ], UsersController.signUp);
    }
}

export default PublicUserRouter;
