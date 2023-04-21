import React, { useEffect } from "react";
import SideBar from "../components/sidebar/SideBar";
import { useState } from "react";
import Post from "../components/post/Post";
import PostType from "../types/post";
import SidebarButton from "../components/sidebar/button/SidebarButton";
import { BiPlusCircle } from "react-icons/bi";
import CreatePost from "../components/createpost/CreatePost";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/OwnAuth";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setCreatePostOpen(false);
  };

  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostType[]>([] as PostType[]);

  const { logout, isLoggedIn } = useAuth();

  const refreshPosts = async () => {
    const include = ["likeCount", "user", "isLikedByUser", "isPostedByUser", "comments"];
    const params = new URLSearchParams();
    params.append("include", include.join(","));

    const response = await fetch(
      `/api/post/index.php${
        params.toString().length > 0 ? `?${params.toString()}` : ""
      }`
    );

    const data = await response.json();

    if (!data.success) {
      logout();
    }

    setPosts(data.data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshPosts();
    }
  }, [isLoggedIn]);

  

  const [createPostOpen, setCreatePostOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <SideBar toggleFunc={toggleSidebar} isOpen={sidebarOpen}>
        <SidebarButton
          text="Create Post"
          icon={BiPlusCircle}
          onClick={() => {
            setSidebarOpen(false);
            setCreatePostOpen(!createPostOpen);
          }}
        />
      </SideBar>
      <CreatePost
        open={createPostOpen}
        setOpen={setCreatePostOpen}
        refresh={refreshPosts}
        onClose={() => setSidebarOpen(true)}
      />
      <main className={`transition-all ${sidebarOpen && "ml-[25%]"}`}>
        {isLoggedIn && (
          <PostSlider>
            {posts &&
              posts.map((post) => (
                <React.Fragment key={post.id}>
                  <div className="h-20"></div>
                  <Post key={post.id} post={post} refreshPosts={refreshPosts}/>
                </React.Fragment>
              ))}
            <div className="h-24"></div>
          </PostSlider>
        )}

        {!isLoggedIn && <HomeGreeting />}
      </main>
    </div>
  );
}

type PostSliderProps = {
  children: React.ReactNode;
};

function HomeGreeting() {
  const navigate = useNavigate();
  return (
    <div className="w-2/3 px-10 mx-auto max-h-[calc(100vh - (24 * 4px))] overflow-hidden">
      <div className="h-20"></div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-gray-600">Welcome to HTLife</h1>
        <div className="h-10"></div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

function PostSlider({ children }: PostSliderProps) {
  return (
    <div className="w-2/3 px-10 mx-auto max-h-[calc(100vh - (24 * 4px))] overflow-hidden">
      {children}
    </div>
  );
}

export default Home;
