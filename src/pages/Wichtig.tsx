import React, { useEffect, useState } from "react";
import PostType from "../types/post";
import { useAuth } from "../hooks/OwnAuth";
import { Link } from "react-router-dom";

function Wichtig() {
  const [posts, setPosts] = useState<PostType[]>([] as PostType[]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [areMorePostsAvailable, setAreMorePostsAvailable] =
    useState<boolean>(true);

  const { logout, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      refreshPosts();
    }
  }, [isLoggedIn]);

  const refreshPosts = async () => {
    const params = new URLSearchParams();
    //params.append("include", include.join(","));
    params.append("page", "1");
    params.append("length", "10");

    const response = await fetch(
      `/api/post/important/${params.toString().length > 0 ? `?${params.toString()}` : ""}`
    );

    const data = await response.json();

    if (!data.success) {
      logout();
    }
    setCurrentPage(1);
    setPosts(data.data);
    setAreMorePostsAvailable(data.data.length > 0);
  };

  const loadMorePosts = async () => {
    const params = new URLSearchParams();
    //params.append("include", include.join(","));
    params.append("page", String(currentPage + 1));
    params.append("length", "10");

    const response = await fetch(
      `/api/post/index.php${
        params.toString().length > 0 ? `?${params.toString()}` : ""
      }`
    );

    const data = await response.json();

    if (!data.success) {
      logout();
    }

    if (data.data.length === 0) {
      setAreMorePostsAvailable(false);
      return;
    }

    setPosts([...posts, ...data.data]);
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="container px-3 mx-6">
      <h1 className="text-3xl font-bold mb-8">Wichtig</h1>
      <div className="grid grid-cols-4">
        {posts.map((post) => (
          <div className="col-4">
            <ImportantPostCard post={post} />
          </div>
        ))}
      </div>

    </div>
  );
}


function ImportantPostCard({ post }: { post: PostType }) {

  const getFormattedDate = (date: string) => {
    const dateObj = new Date(date);

    if (new Date().getTime() - dateObj.getTime() < 1000 * 60 * 60 * 24 * 7) {
      const seconds = Math.floor(
        (new Date().getTime() - dateObj.getTime()) / 1000
      );
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        return "just now";
      } else if (minutes < 60) {
        return `vor ${minutes}m`;
      } else if (hours < 24) {
        return `vor ${hours}h`;
      } else if (days < 7) {
        return `vor ${days}d`;
      }
    }

    // else return date
    return dateObj.toLocaleDateString("de-DE", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <Link to={"/post/"+post.id}>
      <div className="card shadow-md">
        <div className="card-header">
          <img src={post.image} alt="" />
        </div>
        <div className="card-body px-4 py-2">
          <div className="flex justify-between">
            <p>@{post.user?.name}</p>

            {/* @ts-ignore */}
            <span>{getFormattedDate(post.date.date)}</span>
          </div>
          <h5 className="card-description">{post.description}</h5>
        </div>
      </div>
    </Link>
  );
}

export default Wichtig;
