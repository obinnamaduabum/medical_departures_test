import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { ApiResponseUtil } from "../utils/api-response-util";
import { AuthenticationUtils } from "../modules/auth/authentication_utils";
import { User } from "../model/user";
import { AuthService } from "../service/auth_service";
import { UserService } from "../service/user_service";

export class Authentication {

    static async logOut(req: Request, res: Response) {

        try {

            return AuthenticationUtils.logout(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async me(req: Request, res: Response) {

        try {

            const verifyToken: any = await AuthenticationUtils.verifyTokenForMe(req, res);

            if (verifyToken === null) {
                return ApiResponseUtil.unAuthenticated(res, 'session or token expired, kindly login again');
            } else if (verifyToken === 'cookieNotFound') {
                return ApiResponseUtil.unAuthenticated(res,'kindly login again');
            }

            const user: User | null =  await UserService.findById(verifyToken.id);

            if(!user) {
                return ApiResponseUtil.unAuthenticated(res);
            }

            return ApiResponseUtil.ok(res, true, '', user);

        } catch (e) {

            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async authenticateUser(req: any, res: any) {
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return ApiResponseUtil.badRequest(res, '', errors);
            }

            const {email, password} = req.body;

            return  AuthService.authenticateUser(password, email, res, req);

        } catch (e) {

            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
