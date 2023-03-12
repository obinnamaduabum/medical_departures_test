import {
    Model,
    DataTypes, Association, HasOneSetAssociationMixin, HasOneGetAssociationMixin
} from 'sequelize';
import Sequelize from 'sequelize';
import { mySqlDatabase } from "../database/mysql_db";
import { User } from "./user";

export class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public date_created!: Date;
    public date_updated!: Date;

    public getUser!: HasOneGetAssociationMixin<User>;
    public setUser!: HasOneSetAssociationMixin<User, number>;

    public static associations: {
        user: Association<Post, User>;
    };
}


Post.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
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
        tableName: "post",
        createdAt: false,
        updatedAt: false,
        sequelize: mySqlDatabase // this bit is important
    }
);

Post.belongsTo(User, {foreignKey: 'user_id'});