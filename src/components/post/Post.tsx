import React from "react";
import { useState } from "react";
import { Likes } from "./Likes";
import { Comments } from "./Comments";
import PostType from "../../types/post";
import { Menu, Transition } from "@headlessui/react";

import { AiOutlineDelete } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";

type PostProps = {
  post: PostType;
  refreshPosts: () => void;
};

function Post({ post, refreshPosts }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLikedByUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);

  const handleLike = async () => {
    const postId = post.id.toString();

    const response = await fetch(`/api/post/like/${postId}`, {
      method: "PUT"
    });

    const data = await response.json();

    if (response.status === 200 && data.success) {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }
  };

  let areMoreComments = true;


  const handleDeletePost = async () => {
    const postId = post.id.toString();

    const response = await fetch(
      `/api/post/${postId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.status === 200 && data.success) {
      refreshPosts();
    }
  }

  return (
    <div className="relative">
      <Menu as="div">
        <Menu.Button className="absolute right-0 top-0 mr-4 mt-4">
          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
            <SlOptions className="h-4 w-4" />
          </div>
        </Menu.Button>
        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-0 mt-12 mr-4 bg-white shadow-lg rounded-md py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/post/${post.id}`}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700 group`}
                >
                  View Post
                </Link>
              )}
            </Menu.Item>
            {post.isPostedByUser && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 group`}
                      onClick={handleDeletePost}
                    >
                      Delete
                      <AiOutlineDelete className="inline-block ml-2 group-hover:text-red-500" />
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="top shadow-2xl">
        <img src={post.image} alt="" className="w-full" />
      </div>
      <div className="bottom mt-6 shadow-xl py-4 px-6 bg-white">
        <div className="user-and-likes flex justify-between">
          <Link
            to={`/account/name/${encodeURIComponent(post.user?.name || "")}`}
            className="hover:underline"
          >
            <div className="user">@{post.user && post.user.name}</div>
          </Link>
          <Likes
            handleLike={handleLike}
            isLiked={isLiked}
            numberOfLikes={likeCount}
          />
        </div>
        <div className="mb-4 ml-1">
          <span className="text">{post.description}</span>
        </div>
        <Comments comments={post.comments || []} post={post} />
      </div>
    </div>
  );
}

export default Post;
