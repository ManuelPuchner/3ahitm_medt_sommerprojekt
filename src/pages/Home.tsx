import React from "react";
import SideBar from "../components/sidebar/SideBar";
import { useState } from "react";
import Post from "../components/post/Post";

import examplePosts from "../exampleData/post/posts";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative">
      <SideBar toggleFunc={toggleSidebar} isOpen={sidebarOpen}>
        {}
      </SideBar>
      <main className={`transition-all ${sidebarOpen && "ml-[25%]"}`}>
        <h1>Home</h1>
        <PostSlider>
          {examplePosts.map((post, index) => (
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
    <div className="w-1/2 mx-auto">
      {children}
    </div>
  );
}

export default Home;
