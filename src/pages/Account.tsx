import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import UserType from "../types/user";
import PostType from "../types/post";

import { BsSearch } from "react-icons/bs";

function Account() {
  const { name } = useParams();

  const [user, setUser] = useState<UserType>();
  const [isMe, setIsMe] = useState<boolean>(false);

  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const getUser = async () => {
    const searchParams = new URLSearchParams();

    if (name === null || name === undefined) {
      searchParams.append("by", "session");
      setIsMe(true);
    } else {
      searchParams.append("by", "name");
      searchParams.append("name", name);
      setIsMe(false);
    }

    searchParams.append("include", "posts");

    const response = await fetch(
      "/api/user/getBy.php?" + searchParams.toString()
    );
    const data = await response.json();

    if (data.success === false) {
      setIsNotFound(true);
      return;
    }

    setIsNotFound(false);
    setUser(data.data);
  };

  useEffect(() => {
    getUser();
  }, [name]);

  if (isNotFound) {
    return <div>Not found</div>;
  }

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex mt-24 flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300"></div>
        <div className="text-2xl font-bold mt-4">{user.name}</div>

        {isMe && (
          <Link to="liked-posts">
            <div className="text-blue-500 mt-4">Liked posts</div>
          </Link>
        )}

        {user.posts && <UserPosts posts={user.posts} />}
      </div>
    </div>
  );
}

function UserPosts({ posts }: { posts: PostType[] }) {
  return (
    <div className="mt-4">
      <div className="text-gray-500 grid grid-cols-3 gap-2">
        {posts && (
          <>
            {posts.map((post) => (
              <Link key={post.id} to={`../post/${post.id}`} className="group bg-black relative aspect-square">
                <img src={post.image} alt="" className="group-hover:opacity-40 transition-opacity"/>
                <div className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BsSearch className="text-4xl mx-auto mb-2 text-white" />
                  <span className="text-white">View More</span>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
