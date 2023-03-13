"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationUtils = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const path_1 = require("path");
const api_response_util_1 = require("../../utils/api-response-util");
const fs = require('fs');
class AuthenticationUtils {
    static generateToken(userId) {
        let privateKey = fs.readFileSync(this.privateKeyUrl, 'utf8');
        return jwt.sign({ "id": userId }, privateKey, this.generateOptions);
    }
    static verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
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
                        return yield this.performVerification(token);
                    }
                    return null;
                }
            }
            return null;
        });
    }
    static verifyTokenForMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
            let envCookieName = process.env.COOKIE_NAME;
            if (envCookieName) {
                let cookie = req.cookies;
                if (cookie) {
                    if (cookie[envCookieName]) {
                        let token = cookie[envCookieName];
                        if (token) {
                            return this.performVerification(token);
                        }
                        else {
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
                        return yield this.performVerification(token);
                    }
                    return null;
                }
            }
            return null;
        });
    }
    static performVerification(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let publicKey = fs.readFileSync(this.publicKeyUrl, 'utf8');
                return jwt.verify(token, publicKey, this.verifyOptions);
            }
            catch (e) {
                return null;
            }
        });
    }
    static checkIfAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const verifyToken = yield AuthenticationUtils.verifyToken(req, res);
                if (verifyToken) {
                    return next();
                }
                else {
                    return api_response_util_1.ApiResponseUtil.unAuthenticated(res);
                }
            }
            catch (e) {
                return api_response_util_1.ApiResponseUtil.unAuthenticated(res);
            }
        });
    }
    static setCookie(token, res, _hostName, _req) {
        // @ts-ignore
        const cookieName = process.env.COOKIE_NAME;
        const options = { maxAge: 1000 * 60 * 60 * 24 * 30 * 12, httpOnly: true };
        return res.cookie(cookieName, token, options);
    }
    static logout(res) {
        // @ts-ignore
        const cookieName = process.env.COOKIE_NAME;
        const options = { expires: new Date(0) };
        res.cookie(cookieName, '/', options);
        return api_response_util_1.ApiResponseUtil.ok(res, true, 'logout successful');
    }
}
exports.AuthenticationUtils = AuthenticationUtils;
AuthenticationUtils.privateKeyUrl = (0, path_1.resolve)(__dirname, "../../assets/security/private.pem");
AuthenticationUtils.publicKeyUrl = (0, path_1.resolve)(__dirname, "../../assets/security/public.pem");
AuthenticationUtils.verifyOptions = {
    issuer: 'http://' + process.env.DOMAIN_ONE,
    subject: 'cccc',
    audience: 'ccc',
    expiresIn: "365d",
    algorithm: ["RS256"]
};
AuthenticationUtils.generateOptions = {
    issuer: 'http://' + process.env.DOMAIN_ONE,
    subject: 'cccc',
    audience: 'ccc',
    expiresIn: "365d",
    algorithm: "RS256"
};
