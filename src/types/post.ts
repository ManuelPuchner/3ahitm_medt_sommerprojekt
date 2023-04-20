import CommentType from './comment';
import LikeType from './like';
import UserType from './user';

interface PostType {
  id: number;
  image: string;
  description: string;
  date: string;
  userId: number;
  user?:UserType;
  comments?: CommentType[];
  likes?: LikeType[];
  likeCount?: number;

  isLikedByUser?: boolean;
  isPostedByUser?: boolean;
};

export default PostType;