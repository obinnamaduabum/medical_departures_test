import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import { ApiResponseUtil } from "../utils/api-response-util";
import { UserService } from "../service/user_service";
import { UserDao } from "../dao/user_dao";
import { UserModel } from "../model/user_model";
import { User } from "../model/user";

export class UsersController {

    static async signUp(req: Request, res: Response) {

        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return ApiResponseUtil.badRequest(res, '', errors);
            }

            const {userName, email, lastName, firstName, otherName, password} = req.body;

            const userModel: UserModel = {
                userName: userName,
                email: email,
                lastName: lastName,
                firstName: firstName,
                otherName: otherName,
                password: password,
            };

            if (userModel.email) {
                const userEmailExists: any[] = await UserDao.checkIfEmailExists(userModel.email.trim());
                if (userEmailExists.length > 0) {
                    return ApiResponseUtil.badRequest(res, 'email already exists');
                }
            }

            if (userModel.userName) {
                const userUserNameExists: any[] = await UserDao.checkIfUsernameExists(userModel.userName);
                if (userUserNameExists.length > 0) {
                    return ApiResponseUtil.badRequest(res, 'username already exists');
                }
            }

            const user: User | null | undefined = await UserService.createUser(userModel);
            if (user) {
                return ApiResponseUtil.createRequest(res, 'user successfully registered', user);
            } else {
                return ApiResponseUtil.InternalServerError(res, null, 'An error occurred during registration');
            }

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
