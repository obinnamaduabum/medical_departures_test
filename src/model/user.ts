import {
    Model,
    DataTypes
} from 'sequelize';
import Sequelize from 'sequelize';
import { mySqlDatabase } from "../database/mysql_db";

export class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public firstName!: string;
    public lastName!: string;
    public otherName!: string;
    public password!: string;
    public date_created!: Date;
    public date_updated!: Date;
}


User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        otherName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_updated: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "user",
        createdAt: false,
        updatedAt: false,
        sequelize: mySqlDatabase // this bit is important
    }
);