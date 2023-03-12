import {Request, Response} from "express";
import { ApiResponseUtil } from "../utils/api-response-util";

export class IndexController {
    static async index(req: Request, res: Response) {
        return ApiResponseUtil.ok(res, true, 'I am here, hello am an app');
    }
}
