"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const mysql_db_1 = require("../database/mysql_db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    firstName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    otherName: {
        type: sequelize_2.default.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    date_created: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    date_updated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "user",
    createdAt: false,
    updatedAt: false,
    sequelize: mysql_db_1.mySqlDatabase // this bit is important
});
