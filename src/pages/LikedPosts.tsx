import React, { useEffect, useState } from "react";
import PostType from "../types/post";

function LikedPosts() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const refreshPosts = async () => {
    const response = await fetch("/api/user/liked-posts.php");
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
        border border-gray-300 rounded-md p-4 mb-4 shadow-md
          w-full
        "
        >
          <div className="flex justify-between">
            <img src={post.image} alt="" />
            <p>{post.description}</p>
            <p>@{post.user?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LikedPosts;
