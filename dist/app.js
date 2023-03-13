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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const my_util_1 = require("./utils/my_util");
const index_router_1 = __importDefault(require("./routes/index_router"));
const public_user_router_1 = __importDefault(require("./routes/public/public_user_router"));
const public_authentication_router_1 = __importDefault(require("./routes/public/public_authentication_router"));
const protected_authentication_router_1 = __importDefault(require("./routes/protected/protected_authentication_router"));
const protected_post_router_1 = __importDefault(require("./routes/protected/protected_post_router"));
const ip = require('ip');
class App {
    constructor() {
        this.allowedOrigins = [
            'localhost:8000',
            'localhost:3000',
            'localhost:4000',
            'localhost:4200',
            'df4o85snh6.execute-api.us-east-1.amazonaws.com:4000',
            'df4o85snh6.execute-api.us-east-1.amazonaws.com'
        ];
        this.app = (0, express_1.default)();
        const myIP = ip.address();
        let HOSTNAME = `${myIP}`;
        if (process.env.NODE_ENV === 'development') {
            if (process.env.HOSTNAME) {
                HOSTNAME = process.env.HOSTNAME;
            }
        }
        let PORT;
        if (process.env.PORT) {
            PORT = parseInt(process.env.PORT);
        }
        else {
            PORT = 3000;
        }
        this.port = PORT;
        this.hostName = HOSTNAME;
        if (process.env.NODE_ENV === 'development') {
            // this.app.use(logger('dev')); // log requests to the console
        }
        this.initializeMiddleWares();
        this.initializeControllers();
    }
    initializeMiddleWares() {
        this.app.use(bodyParser.json({ limit: '1000mb' }));
        this.app.use((0, cookie_parser_1.default)());
        const allowedOrigins = this.allowedOrigins;
        const myCors = (0, cors_1.default)({
            origin: function (origin, callback) {
                // allow requests with no origin
                if (!origin) {
                    return callback(null, true);
                }
                if (my_util_1.MyUtils.indexOfArray(allowedOrigins, origin) === -1) {
                    let msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
            exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
            credentials: true,
        });
        // this.app.use(myCors);
        this.app.use((0, cors_1.default)({ origin: '*' }));
    }
    initializeControllers() {
        const routers = [
            {
                url: '/',
                routerObj: new index_router_1.default()
            },
            {
                url: '/api/public/users',
                routerObj: new public_user_router_1.default()
            },
            {
                url: '/api/public/auth',
                routerObj: new public_authentication_router_1.default()
            },
            {
                url: '/api/protected/auth',
                routerObj: new protected_authentication_router_1.default()
            },
            {
                url: '/api/protected/posts',
                routerObj: new protected_post_router_1.default()
            }
        ];
        routers.forEach((router) => {
            if (router) {
                this.app.use(router.url, router.routerObj.router);
            }
        });
    }
    listen() {
        this.app.listen(this.port, this.hostName, () => {
            console.log(`App listening on the host: ${this.hostName} and port: ${this.port}`);
            console.log(`Env: ${process.env.NODE_ENV}`);
            console.log(`API gateway server running express started on hostname: ${this.hostName} port: ${this.port}.`);
        });
    }
}
exports.default = new App().app;
