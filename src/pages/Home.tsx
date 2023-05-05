import React, { useEffect, useRef } from "react";
import SideBar from "../components/sidebar/SideBar";
import { useState } from "react";
import Post from "../components/post/Post";
import PostType from "../types/post";
import SidebarButton from "../components/sidebar/button/SidebarButton";
import { BiPlusCircle } from "react-icons/bi";
import CreatePost from "../components/createpost/CreatePost";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/OwnAuth";
import { Dialog, Transition } from "@headlessui/react";

function Home() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostType[]>([] as PostType[]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [createPostOpen, setCreatePostOpen] = useState<boolean>(false);
  const [areMorePostsAvailable, setAreMorePostsAvailable] =
    useState<boolean>(true);

  const { logout, isLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setCreatePostOpen(false);
  };

  const include = [
    "likeCount",
    "user",
    "isLikedByUser",
    "isPostedByUser",
    "comments",
  ];

  const refreshPosts = async () => {
    const params = new URLSearchParams();
    params.append("include", include.join(","));
    params.append("page", "1");
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
    setCurrentPage(1);
    setPosts(data.data);
    setAreMorePostsAvailable(data.data.length > 0);
  };

  const loadMorePosts = async () => {
    const params = new URLSearchParams();
    params.append("include", include.join(","));
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

  useEffect(() => {
    if (isLoggedIn) {
      refreshPosts();
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 2
  //     ) {
  //       console.log("load more posts");
  //       loadMorePosts();
  //     }
  //   }
  //    window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   }

  // }, []);

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
                  <Post key={post.id} post={post} refreshPosts={refreshPosts} />
                </React.Fragment>
              ))}
            <div className="h-24"></div>
          </PostSlider>
        )}

        <div className="w-full flex justify-center">
          <button
            className="
              px-4 py-2 m-4
              text-white bg-blue-500 rounded-md
            "
            onClick={loadMorePosts}
          >
            Load More
          </button>
        </div>

        <NoMorePostsModal
          isOpen={areMorePostsAvailable}
          setIsOpen={setAreMorePostsAvailable}
        />

        {!isLoggedIn && <HomeGreeting />}
      </main>
    </div>
  );
}

type PostSliderProps = {
  children: React.ReactNode;
};

function NoMorePostsModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Transition appear show={!isOpen} as="div">
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(true)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Keine Posts mehr verfügbar
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Es sind keine weiteren Posts verfügbar. Du kannst natürlich
                    auch selbst einen Post erstellen. Oder du wartest einfach
                    bis jemand anderes etwas postet.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(true)}
                  >
                    Okay
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

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
