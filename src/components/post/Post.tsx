import React from "react";
import { useState } from "react";
import { Likes } from "./Likes";
import { Comments } from "./Comments";
import PostType from "../../types/post";

type PostProps = {
  post: PostType;
};

function Post({post}: PostProps) {
  let [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  let areMoreComments = true;

  return (
    <div className="">
      <div className="top shadow-2xl">
        <img src={post.image} alt="" className=""/>
      </div>
      <div className="bottom mt-6 shadow-xl py-4 px-6 bg-white">
        <div className="user-and-likes flex justify-between">
          <div className="user">@{post.user}</div>
          <Likes
            handleLike={handleLike}
            isLiked={isLiked}
            numberOfLikes={post.likes.length}
          />
        </div>
        <div className="mb-4 ml-1">
          <span className="text">{post.description}</span>
        </div>
        <Comments comments={post.comments} />
      </div>
    </div>
  );
}

export default Post;
