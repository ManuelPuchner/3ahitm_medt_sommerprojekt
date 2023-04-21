import UserType from "./user";

interface CommentType {
  id: number;
  userId: number;
  postId: number;
  text: string;
  date: string;

  user?: UserType;
}

export default CommentType;