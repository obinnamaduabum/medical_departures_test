export class PostModel {

   title: string;
   content: string;
   user_id: number;


    constructor(title: string, content: string, user_id: number) {
        this.title = title;
        this.content = content;
        this.user_id = user_id;
    }

}