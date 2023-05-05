import React, { useRef, useState } from "react";
import CommentType from "../../types/comment";
import PostType from "../../types/post";

import { BiCommentDetail, BiCommentAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserType from "../../types/user";

type CommentsProps = {
  comments: CommentType[];
  post: PostType;
};
export function Comments({ comments, post }: CommentsProps) {
  return (
    <div className="comments-wrapper opacity-90">
      <div className="flex justify-between items-center">
        <span className="">{comments.length} Kommentare</span>
        <Link
          to={`/post/${post.id}?comment=true`}
          className="
          flex items-center
          px-3
          py-2
          hover:bg-gray-200
          rounded-lg
          transition
        "
        >
          {comments.length === 0 && (
            <BiCommentAdd className="inline-block text-2xl" />
          )}
        </Link>
      </div>
      <div className="comments opacity-80 ml-1">
        {comments.slice(0, 3).map((comment, index) => (
          <PostComment key={index} comment={comment} />
        ))}
        {comments.length > 0 && (
          <Link
            to={`/post/${post.id}?comment=true`}
            className="
            block
            text-md
            text-center
            mt-2
            text-black
            hover:underline
          "
          >
            View all {comments.length} comments
          </Link>
        )}
      </div>
    </div>
  );
}
type PostCommentProps = {
  comment: CommentType;
};
function PostComment({ comment }: PostCommentProps) {
  return (
    <div className="comment">
      <span className="user">@{comment.user?.name}</span>
      {": "}
      <span className="text">{comment.text}</span>
    </div>
  );
}
