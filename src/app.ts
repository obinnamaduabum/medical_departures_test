import express, { Application } from 'express';
import { CustomRouterInterface } from "./interface/custom_router_interface";
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { MyUtils } from "./utils/my_util";
import IndexRouter from "./routes/index_router";
import PublicUserRouter from "./routes/public/public_user_router";
import PublicAuthenticationRouter from "./routes/public/public_authentication_router";
import ProtectedAuthenticationRouter from "./routes/protected/protected_authentication_router";
import ProtectedPostRouter from "./routes/protected/protected_post_router";
const ip = require('ip');
class App {
    public app: Application;
    public port: number;
    public hostName: string;

    public allowedOrigins: string[] = [
        'localhost:8000',
        'localhost:3000',
        'localhost:4000',
        'localhost:4200',
        'localhost:9876',
    ];

    constructor() {
        this.app = express();

        const myIP = ip.address();

        let HOSTNAME = `${myIP}`;
        if(process.env.NODE_ENV === 'development'){
            if(process.env.HOSTNAME) {
                HOSTNAME = process.env.HOSTNAME;
            }
        }

        let PORT
        if (process.env.PORT) {
            PORT = parseInt(process.env.PORT);
        } else {
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

    private initializeMiddleWares() {
        this.app.use(bodyParser.json({limit: '1000mb'}));
        this.app.use(cookieParser());
        const allowedOrigins = this.allowedOrigins;
        const myCors = cors({

            origin: function (origin, callback) {
                // allow requests with no origin
                if (!origin) {
                    return callback(null, true);
                }
                if (MyUtils.indexOfArray(allowedOrigins, origin) === -1) {
                    let msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }

                return callback(null, true);
            },
            exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
            credentials: true,
        });
        this.app.use(myCors);
    }

    private initializeControllers() {
        const routers: CustomRouterInterface[] = [
            {
                url: '/',
                routerObj: new IndexRouter()
            },
            {
                url: '/api/public/users',
                routerObj: new PublicUserRouter()
            },
            {
                url: '/api/public/auth',
                routerObj: new PublicAuthenticationRouter()
            },
            {
                url: '/api/protected/auth',
                routerObj: new ProtectedAuthenticationRouter()
            },
            {
                url: '/api/protected/posts',
                routerObj: new ProtectedPostRouter()
            }
        ];

        routers.forEach((router) => {
            if (router) {
                this.app.use(router.url, router.routerObj.router);
            }
        });
    }

    public listen() {
       this.app.listen(this.port, this.hostName, () => {
            console.log(`App listening on the host: ${this.hostName} and port: ${this.port}`);
            console.log(`Env: ${process.env.NODE_ENV}`);
            console.log(`API gateway server running express started on hostname: ${this.hostName} port: ${this.port}.`);
        });
    }
}

export default new App().app;