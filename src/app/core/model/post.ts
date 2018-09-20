import { Comment } from './comment';
export class Post {
    author: String;
    title: String;
    content: String;
    tags: String[];
    createDate: Date;
    comments: Comment[];
}
