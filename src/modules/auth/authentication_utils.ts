import * as jwt from "jsonwebtoken";
import { resolve } from "path";
import { NextFunction, Request, Response } from 'express';
import { ApiResponseUtil } from "../../utils/api-response-util";
const fs = require('fs');

export class AuthenticationUtils {

    private static privateKeyUrl = resolve(__dirname, "../../assets/security/private.pem");
    private static publicKeyUrl = resolve(__dirname, "../../assets/security/public.pem");

    private static verifyOptions: any = {
        issuer: 'http://' + process.env.DOMAIN_ONE,
        subject: 'cccc',
        audience: 'ccc',
        expiresIn: "365d",
        algorithm: ["RS256"]
    };

    private static generateOptions: any = {
        issuer: 'http://' + process.env.DOMAIN_ONE,
        subject: 'cccc',
        audience: 'ccc',
        expiresIn: "365d",
        algorithm: "RS256"
    };


    static generateToken(userId: any) {
        let privateKey = fs.readFileSync(this.privateKeyUrl, 'utf8');
        return jwt.sign({"id": userId}, privateKey, this.generateOptions);
    }


    static async verifyToken(req: Request, res: Response) {

        let token: string;
        let envCookieName = process.env.COOKIE_NAME;

        if (envCookieName) {

            let cookie = req.cookies;

            if (cookie) {
                if (cookie[envCookieName]) {
                    let token = cookie[envCookieName];

                    if (token) {
                        return this.performVerification(token);
                    }
                }
            }
        }

        if (req.headers) {
            if (req.headers.authorization) {
                if (req.headers.authorization.split(" ")[1]) {
                    token = req.headers.authorization.split(" ")[1];
                    return await this.performVerification(token);
                }

                return null;
            }
        }

        return null;
    }


    static async verifyTokenForMe(req: Request, res: Response) {

        let token: string;
        let envCookieName = process.env.COOKIE_NAME;

        if (envCookieName) {

            let cookie = req.cookies;

            if (cookie) {
                if (cookie[envCookieName]) {
                    let token = cookie[envCookieName];

                    if (token) {
                        return this.performVerification(token);
                    } else {
                        return "cookieNotFound";
                    }
                }
                // return "cookieNotFound";
            }
        }

        if (req.headers) {
            if (req.headers.authorization) {
                if (req.headers.authorization.split(" ")[1]) {
                    token = req.headers.authorization.split(" ")[1];
                    return await this.performVerification(token);
                }

                return null;
            }
        }

        return null;
    }

    static async performVerification(token: string) {
        try {
            let publicKey = fs.readFileSync(this.publicKeyUrl, 'utf8');

            return jwt.verify(token, publicKey, this.verifyOptions)

        } catch (e) {
            return null;
        }
    }

    static async checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

        try {
            const verifyToken = await AuthenticationUtils.verifyToken(req, res);

            if (verifyToken) {
                return next();
            } else {
                return ApiResponseUtil.unAuthenticated(res);
            }

        } catch (e) {
            return ApiResponseUtil.unAuthenticated(res);
        }
    }

    static setCookie(token: string, res: Response, _hostName: string, _req: Request) {
        // @ts-ignore
        const cookieName: string = process.env.COOKIE_NAME;
        const options = {maxAge: 1000 * 60 * 60 * 24 * 30 * 12, httpOnly: true};
        return res.cookie(cookieName, token, options);
    }


    static logout(res: Response) {
        // @ts-ignore
        const cookieName: string = process.env.COOKIE_NAME;
        const options = {expires: new Date(0)};
        res.cookie(cookieName, '/', options);
        return ApiResponseUtil.ok(res, true, 'logout successful');
    }
}
