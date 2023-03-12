import { Post } from "../model/post";
import { PostModel } from "../model/post_model";
import { PostDao } from "../dao/post_dao";

export class PostService {
    static async create(postInput: PostModel): Promise<Post> {
        const data  = {
            title: postInput.title,
            content: postInput.content,
            user_id: postInput.user_id,
            date_created: new Date(),
            date_updated: new Date()
        };
        return await Post.create(data);
    }

    static async findById(id: number): Promise<Post> {
        return PostDao.findById(id);
    }

    static async deleteById(id: number): Promise<Post> {
        return PostDao.deleteById(id);
    }

    static async updatePost(id: number, title: string, content: string) {
        return PostDao.updateById(id, title, content);
    }
}