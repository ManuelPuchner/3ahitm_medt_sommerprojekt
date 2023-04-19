import React, { useEffect } from "react";
import SideBar from "../components/sidebar/SideBar";
import { useState } from "react";
import Post from "../components/post/Post";
import PostType from "../types/post";


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [posts, setPosts] = useState<PostType[]>([] as PostType[]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/post/index.php`
      );

      const data = await response.text();
      console.log(data);
      
      // setPosts(data.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative">
      <SideBar toggleFunc={toggleSidebar} isOpen={sidebarOpen}>
        {}
      </SideBar>
      <main className={`transition-all ${sidebarOpen && "ml-[25%]"}`}>
        <PostSlider>
          <div className="h-20"></div>
          {posts && posts.map((post, index) => (
            <>
              <Post key={index} post={post} />
              <div className="spacer h-10"></div>
            </>
          ))}
        </PostSlider>
      </main>
    </div>
  );
}

type PostSliderProps = {
  children: React.ReactNode;
};

function PostSlider({ children }: PostSliderProps) {
  return (
    <div className="w-2/3 px-10 mx-auto max-h-[calc(100vh - (24 * 4px))] overflow-hidden">
      {children}
    </div>
  );
}

export default Home;
