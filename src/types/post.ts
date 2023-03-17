import CommentType from "./comment";
import LikeType from "./like";

interface PostType {
  user: string;
  description: string;
  image: string;
  likes: LikeType[];
  comments: CommentType[];
}

export default PostType;