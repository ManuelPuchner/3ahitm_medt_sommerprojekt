import React from "react";
import CommentType from "../../types/comment";

type CommentsProps = {
  comments: CommentType[]
}
export function Comments({ comments }: CommentsProps) {
  return (
    <div className="comments-wrapper opacity-90">
      <span className="">{comments.length} Kommentare</span>
      <div className="comments opacity-80 ml-1">
        {comments.map((comment, index) => (
          <PostComment key={index} user={comment.user} text={comment.text} />
        ))}
      </div>
    </div>
  );
}
type PostCommentProps = {
  user: string;
  text: string;
};
function PostComment({ user, text }: PostCommentProps) {
  return (
    <div className="comment">
      <span className="user">@{user}</span>
      {": "}
      <span className="text">{text}</span>
    </div>
  );
}
