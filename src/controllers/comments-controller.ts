import { Request, Response } from "express";
import { ApiResponseUtil } from "../utils/api-response-util";
import { PostModel } from "../model/post_model";
import { validationResult } from "express-validator";
import { AuthenticationUtils } from "../modules/auth/authentication_utils";
import { PostService } from "../service/post_service";
import { MyUtils } from "../utils/my_util";
import { Post } from "../entity/post";
import { User } from "../entity/user";

export class PostController {

    static async createPost(req: Request, res: Response) {

        try {

            const verifyToken: any = await AuthenticationUtils.verifyTokenForMe(req, res);

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return ApiResponseUtil.badRequest(res, '', errors);
            }

            const { title, content } = req.body;

            const postModel = new PostModel(title, content, verifyToken?.id);

            const post = await PostService.create(postModel);

           return ApiResponseUtil.createRequest(res, 'Blog post created', post);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async updatePost(req: Request, res: Response) {

        try {

            const verifyToken: any = await AuthenticationUtils.verifyTokenForMe(req, res);

            const idAsString: string = req.params['id'];

            if(!idAsString) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            const id = MyUtils.stringToNumber(idAsString);

            if(!id) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return ApiResponseUtil.badRequest(res, '', errors);
            }

            const { title, content } = req.body;

            let post: Post = await PostService.findById(id);

            const user: User = await post.getUser();

            if(user.id !== verifyToken.id) {
                return ApiResponseUtil.forbidden(res, false, 'No access to perform operation');
            }

            post = await PostService.updatePost(id, title, content);

            return ApiResponseUtil.ok(res, true, 'Blog post updated', post);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async deletePost(req: Request, res: Response) {

        try {

            const idAsString: string = req.params['id'];

            if(!idAsString) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            const result = MyUtils.stringToNumber(idAsString);

            if(!result) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            await PostService.deleteById(result);

            return ApiResponseUtil.ok(res, true, 'Blog post deleted');

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }


    static async viewPost(req: Request, res: Response) {

        try {

            const idAsString: string = req.params['id'];

            if(!idAsString) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            const result = MyUtils.stringToNumber(idAsString);

            if(!result) {
                return ApiResponseUtil.badRequest(res, 'id is required');
            }

            const post = await PostService.findById(result);

            if(!post) {
                return ApiResponseUtil.notFound(res, 'Blog not found');
            }

            return ApiResponseUtil.ok(res, true, 'Blog found', post);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

}
