"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const mysql_db_1 = require("../database/mysql_db");
const user_1 = require("./user");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
Post.init({
    id: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    content: {
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
    tableName: "post",
    createdAt: false,
    updatedAt: false,
    sequelize: mysql_db_1.mySqlDatabase // this bit is important
});
Post.belongsTo(user_1.User, { foreignKey: 'user_id' });
