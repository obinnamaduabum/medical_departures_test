import dotEnvFlow from "dotenv-flow";

dotEnvFlow.config();
import { mySqlDatabase } from "./database/mysql_db";
import { App } from "./app";
import { CustomRouterInterface } from "./interface/custom_router_interface";
import IndexRouter from "./routes/index_router";
import { InitStartUpActions } from "./start_up_actions/init_start_up_actions";
import PublicUserRouter from "./routes/public/public_user_router";
import ProtectedAuthenticationRouter from "./routes/protected/protected_authentication_router";
import PublicAuthenticationRouter from "./routes/public/public_authentication_router";
import ProtectedPostRouter from "./routes/protected/protected_post_router";
const ip = require('ip');

let customRouters: CustomRouterInterface[] = [
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

let PORT;
let HOSTNAME;


const myIP = ip.address();

HOSTNAME = `${myIP}`;
if(process.env.NODE_ENV === 'development'){
    if(process.env.HOSTNAME) {
        HOSTNAME = process.env.HOSTNAME;
    }
}

if (process.env.PORT) {
    PORT = parseInt(process.env.PORT);
} else {
    PORT = 3000;
}

const app = new App(
    customRouters,
    PORT,
    HOSTNAME
);

try {
    mySqlDatabase.sync({alter: false, force: false}).then(async () => {
        await InitStartUpActions.init();
        console.info('mysql connected');
        app.listen();
    }).catch((err) => {
        console.error('mysql not connected');
        console.error(err);
    });

} catch (e) {
    console.error(e);
}


