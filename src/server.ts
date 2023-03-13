import dotEnvFlow from "dotenv-flow";

dotEnvFlow.config();
import { mySqlDatabase } from "./database/mysql_db";
import { InitStartUpActions } from "./start_up_actions/init_start_up_actions";
import app from './App'
const ip = require('ip');

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

try {
    mySqlDatabase.sync({alter: false, force: false}).then(async () => {
        await InitStartUpActions.init();
        console.info('mysql connected');
        app.listen(PORT, HOSTNAME, () => {
            console.log(`App listening on the host: ${HOSTNAME} and port: ${PORT}`);
            console.log(`Env: ${process.env.NODE_ENV}`);
            console.log(`API gateway server running express started on hostname: ${HOSTNAME} port: ${PORT}.`);
        });
    }).catch((err) => {
        console.error('mysql not connected');
        console.error(err);
    });

} catch (e) {
    console.error(e);
}


