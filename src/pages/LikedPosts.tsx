import React, { useEffect, useState } from "react";
import PostType from "../types/post";

import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

function LikedPosts() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const refreshPosts = async () => {
    const response = await fetch("/api/user/liked-posts/");
    const data = await response.json();
    setPosts(data.data);

    console.log(data.data);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div className="mt-12 max-w-2xl mx-auto px-8">
      <h1
        className="
        text-2xl font-bold
        mb-4
      "
      >
        Your Liked Posts
      </h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="
            p-4 mb-4 shadow-md
            w-full
            relative
          "
        >
          <div className="flex gap-8">
            <img
              src={post.image}
              alt=""
              className="
                h-52
              "
            />
            <div>
              <h2
                className="
                  text-xl font-bold
                  mb-2
                "
              >
                @{post.user?.name}
              </h2>
              <p
                className="
                  text-lg
                "
              >
                {post.description}
              </p>
            </div>
            <div>
              <Link
                to={`/post/${post.id}`}
                className="absolute right-6 top-1/2 -translate-y-1/2
                hover:text-blue-700 hover:shadow-md p-2 rounded-full transition"
              >
                <BsChevronRight className="text-4xl ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LikedPosts;
