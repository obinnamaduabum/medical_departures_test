import { Response } from "express";

export class ApiResponseUtil {

    static InternalServerError(res, e: any = null, message = 'Internal Server Error') {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: message,
            data: null
        });
    }

    static unAuthenticated(res, message = 'unauthenticated') {
        return res.status(401).send({
            success: false,
            message: message,
            data: null
        });
    }

    static badRequest(res: Response, message: string = '', errors: any = []) {
        return res.status(400).send({
            success: false,
            message: message,
            data: null,
            errors: errors
        });
    }

    static createRequest(res: Response, message: string = '', data: any,  errors: any = []) {
        return res.status(201).send({
            success: true,
            message: message,
            data: data
        });
    }

    static ok(res: Response, success = false, message: string = '', data: any = {},  errors: any = []) {
        return res.status(200).send({
            success: success,
            message: message,
            data: data,
            errors: errors
        });
    }


}
