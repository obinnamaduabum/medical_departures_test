import Sequelize, { QueryTypes } from 'sequelize';
import { mySqlDatabase } from "../database/mysql_db";
import { Post } from "../model/post";
export class PostDao {
    static async findById(id: number): Promise<Post> {
        try {
            // @ts-ignore
            return await mySqlDatabase.query(
                `SELECT * from post as p WHERE p.id = :id;`,
                {
                    replacements: {
                        id: id,
                    },
                    model: Post,
                    mapToModel: true,
                    type: QueryTypes.SELECT,
                    plain: true,
                }
            );
        } catch (e) {
            throw e;
        }
    }


    static async deleteById(id: number): Promise<Post> {
        try {
            // @ts-ignore
            return await mySqlDatabase.query(
                `DELETE from post as p WHERE p.id = :id;`,
                {
                    replacements: {
                        id: id,
                    },
                    type: QueryTypes.DELETE,
                }
            );
        } catch (e) {
            throw e;
        }
    }


    static async updateById(id: number, title: string, content: string): Promise<Post> {
        try {
            // @ts-ignore
            return await mySqlDatabase.query(
                `UPDATE post set title = :title, content = :content, date_updated = :dateUpdated where id = :id;`,
                {
                    replacements: {
                        id: id,
                        title: title,
                        content: content,
                        dateUpdated: new Date()
                    },
                    type: QueryTypes.UPDATE,
                }
            );
        } catch (e) {
            throw e;
        }
    }

}
