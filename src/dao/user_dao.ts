import Sequelize, { QueryTypes } from 'sequelize';
import { User } from "../model/user";
import { mySqlDatabase } from "../database/mysql_db";
import { UserModel } from "../model/user_model";

export class UserDao {

    static async checkIfUsernameExists(username: string) {
        return await mySqlDatabase.query(
            `SELECT u.username from user as u WHERE lower(u.username) = :username; `,
            {
                replacements: {
                    username: username,
                },
                mapToModel: false,
                type: QueryTypes.SELECT
            }
        );
    }

    static async findByEmail(email: string): Promise<User> {
        try {
            // @ts-ignore
            return await mySqlDatabase.query(
                `SELECT * from user as u WHERE lower(u.email) = :email;`,
                {
                    replacements: {
                        email: email,
                    },
                    model: User,
                    mapToModel: true,
                    type: QueryTypes.SELECT,
                    plain: true,
                }
            );
        } catch (e) {
            throw e;
        }
    }

    static async findById(id: number): Promise<User> {
        try {
            // @ts-ignore
            return await mySqlDatabase.query(
                `SELECT * from user as u WHERE u.id = :id;`,
                {
                    replacements: {
                        id: id,
                    },
                    model: User,
                    mapToModel: true,
                    type: QueryTypes.SELECT,
                    plain: true,
                }
            );
        } catch (e) {
            throw e;
        }
    }

    static async checkIfEmailExists(email: string) {
        return await mySqlDatabase.query(
            `SELECT u.email from user as u WHERE lower(u.email) = :email; `,
            {
                replacements: {
                    email: email,
                },
                mapToModel: false,
                type: QueryTypes.SELECT
            }
        );
    }

    static async checkIfPhoneNumberExists(phoneNumber: string) {
        return User.findOne({where: {
            phoneNumber: phoneNumber.toString().toLocaleLowerCase()
        }});
    }

    static async saveUser(userModel: UserModel) {

        return User.create({
            firstName: userModel.firstName.toLocaleLowerCase(),
            lastName: userModel.lastName.toLocaleLowerCase(),
            otherName: userModel?.otherName?.toLocaleLowerCase() || "",
            username: userModel.userName.toLocaleLowerCase(),
            email: userModel.email.toLocaleLowerCase(),
            password: userModel.password
        });
    }

}
