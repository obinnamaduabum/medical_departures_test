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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySqlDatabase = void 0;
const sequelize_1 = require("sequelize");
if (!process.env.MYSQL_DATABASE) {
    throw "Database Configuration properties not found";
}
const mySqlDatabase = new sequelize_1.Sequelize({
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    define: {
        timestamps: true
    },
    logging: false,
    pool: {
        max: 10,
        min: 1,
        idle: 1,
        evict: 15000,
        acquire: 6000000
    }
});
exports.mySqlDatabase = mySqlDatabase;
try {
    mySqlDatabase.authenticate().then((_err) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Connection has been established successfully.');
    })).catch(function (err) {
        console.log('Unable to connect to the database:', err);
        if (err)
            throw new Error(err);
    });
}
catch (err) {
    console.log('database error');
    if (err) {
        throw new Error(err);
    }
}
