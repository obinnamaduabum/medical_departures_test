import { Request, Response } from 'express';
import { BcryptPasswordUtil } from "../utils/bcrypt-password-util";
import { AuthenticationUtils } from "../modules/auth/authentication_utils";
import { ApiResponseUtil } from "../utils/api-response-util";
import { UserService } from "./user_service";

export class AuthService {

    static async authenticateUser(password: string, email: string, res: Response, req: Request) {

       const user = await UserService.findByEmail(email);

        if (!user) {
          return ApiResponseUtil.unAuthenticated(res, 'email or password is invalid');
        }

        const isPasswordValid = await BcryptPasswordUtil.compare(password, user.password);

        if (isPasswordValid) {
            const token = AuthenticationUtils.generateToken(user.id);

            let hostName = '';
            if (req.headers.host) {
                hostName = req.headers.host;
            }

            AuthenticationUtils.setCookie(token, res, hostName, req);

            return ApiResponseUtil.ok(res, true, 'token successfully generated', token);
        }

        return ApiResponseUtil.ok(res, false, 'email or password invalid');
    }
}