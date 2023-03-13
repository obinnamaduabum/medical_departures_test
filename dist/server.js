"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
dotenv_flow_1.default.config();
const mysql_db_1 = require("./database/mysql_db");
const init_start_up_actions_1 = require("./start_up_actions/init_start_up_actions");
const App_1 = __importDefault(require("./App"));
const ip = require('ip');
let PORT;
let HOSTNAME;
const myIP = ip.address();
HOSTNAME = `${myIP}`;
if (process.env.NODE_ENV === 'development') {
    if (process.env.HOSTNAME) {
        HOSTNAME = process.env.HOSTNAME;
    }
}
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT);
}
else {
    PORT = 3000;
}
try {
    mysql_db_1.mySqlDatabase.sync({ alter: false, force: false }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield init_start_up_actions_1.InitStartUpActions.init();
        console.info('mysql connected');
        App_1.default.listen(PORT, HOSTNAME, () => {
            console.log(`App listening on the host: ${HOSTNAME} and port: ${PORT}`);
            console.log(`Env: ${process.env.NODE_ENV}`);
            console.log(`API gateway server running express started on hostname: ${HOSTNAME} port: ${PORT}.`);
        });
    })).catch((err) => {
        console.error('mysql not connected');
        console.error(err);
    });
}
catch (e) {
    console.error(e);
}
