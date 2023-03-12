import { mySqlDatabase } from "../database/mysql_db";
import { Transaction } from "sequelize";
import { BcryptPasswordUtil } from "../utils/bcrypt-password-util";
import { UserModel } from "../model/user_model";
import { User } from "../model/user";
import { UserDao } from "../dao/user_dao";

export class UserService {

    static async createUser(userInput: UserModel) {

        let transaction: Transaction = await mySqlDatabase.transaction();

        try {

            const saltRounds = 10;
            if(!userInput.password) {
                throw new Error();
            }

            const encryptedPassword: string | null = await BcryptPasswordUtil.getHashedPassword(userInput.password, saltRounds);

            if(!encryptedPassword) {
                throw new Error();
            }

            let userModel: UserModel = new UserModel(
                userInput.firstName,
                userInput.lastName,
                userInput?.otherName,
                userInput.firstName + userInput.lastName,
                userInput?.email?.toLowerCase(),
                encryptedPassword
            );

            const otherName = userModel?.otherName?.toLocaleLowerCase() || "";

            const userData = {
                firstName: userModel.firstName.toLocaleLowerCase(),
                lastName: userModel.lastName.toLocaleLowerCase(),
                otherName: otherName,
                username: userModel.userName,
                email: userModel.email.toLocaleLowerCase(),
                password: userModel.password,
                date_created: new Date(),
                date_updated: new Date()
            };

            const user = await User.create(userData,{transaction: transaction});
            await transaction.commit();

            return user;

        } catch (e) {
            console.log(e);
            await transaction.rollback();
        }
    }

    static async findByEmail(email: string): Promise<User | null> {
        const user = await UserDao.findByEmail(email);
        if(user) {
            return user;
        }
        return null;
    }

    static async findById(id: number): Promise<User | null> {
        const users = await UserDao.findById(id);
        if(users){
            return users;
        }
        return null;
    }
}
