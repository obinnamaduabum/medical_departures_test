"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseUtil = void 0;
class ApiResponseUtil {
    static InternalServerError(res, e = null, message = 'Internal Server Error') {
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
    static badRequest(res, message = '', errors = []) {
        return res.status(400).send({
            success: false,
            message: message,
            data: null,
            errors: errors
        });
    }
    static createRequest(res, message = '', data, errors = []) {
        return res.status(201).send({
            success: true,
            message: message,
            data: data
        });
    }
    static ok(res, success = false, message = '', data = {}, errors = []) {
        return res.status(200).send({
            success: success,
            message: message,
            data: data,
            errors: errors
        });
    }
    static forbidden(res, success = false, message = '', data = {}, errors = []) {
        return res.status(403).send({
            success: success,
            message: message,
            data: data,
            errors: errors
        });
    }
    static notFound(res, message = 'not found') {
        return res.status(404).send({
            success: false,
            message: message,
            data: null,
            errors: []
        });
    }
}
exports.ApiResponseUtil = ApiResponseUtil;
