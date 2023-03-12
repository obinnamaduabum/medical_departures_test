import express, { Application } from 'express';
import { CustomRouterInterface } from "./interface/custom_router_interface";
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { MyUtils } from "./utils/my_util";

export class App {
    public app: Application;
    public port: number;
    public hostName: string;

    public allowedOrigins: string[] = [
        'localhost:8000',
        'localhost:3000',
        'localhost:4200',
        'localhost:9876',
    ];

    constructor(controllers: CustomRouterInterface[], port: number, hostName: string) {
        this.app = express();
        this.port = port;
        this.hostName = hostName;
        if (process.env.NODE_ENV === 'development') {
           // this.app.use(logger('dev')); // log requests to the console
        }
        this.initializeMiddleWares();
        this.initializeControllers(controllers);
    }

    private initializeMiddleWares() {
        this.app.use(bodyParser.json({limit: '1000mb'}));
        this.app.use(cookieParser());
        const allowedOrigins = this.allowedOrigins;
        const myCors = cors({

            origin: function (origin, callback) {
                // allow requests with no origin
                // (like mobile apps or curl requests)
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

    private initializeControllers(controllers: CustomRouterInterface[]) {
        controllers.forEach((controller) => {
            if (controller) {
                this.app.use(controller.url, controller.routerObj.router);
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
