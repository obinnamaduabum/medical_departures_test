import { Router } from 'express';
import { PostController } from "../../controllers/post-controller";
import { AuthenticationUtils } from "../../modules/auth/authentication_utils";
import { body } from "express-validator";

class ProtectedPostRouter {

    public router: Router = Router();

    private handlers: any[] = [
        AuthenticationUtils.checkIfAuthenticated,
        body('title', 'title required').not().isEmpty().exists(),
        body('content', 'content required').not().isEmpty().exists(),
    ];

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/create', this.handlers, PostController.createPost);
        this.router.get('/:id', AuthenticationUtils.checkIfAuthenticated, PostController.viewPost);
        this.router.post('/update/:id', this.handlers, PostController.updatePost);
        this.router.delete('/remove/:id', AuthenticationUtils.checkIfAuthenticated, PostController.deletePost);
    }
}

export default ProtectedPostRouter;
