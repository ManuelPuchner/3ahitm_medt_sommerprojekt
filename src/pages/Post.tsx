import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostType from "../types/post";

import { BiArrowBack } from "react-icons/bi";
import CommentType from "../types/comment";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType>();

  const navigate = useNavigate();

  const commentsRef = useRef<HTMLDivElement>(null);

  const [createComment, setCreateComment] = useState<boolean>(false);

  const [comments, setComments] = useState<CommentType[]>([]);

  const createCommentFormRef = useRef<HTMLFormElement>(null);

  const getPost = async () => {
    if (postId === undefined) {
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.append("by", "id");
    searchParams.append("id", postId);
    searchParams.append("include", "user,comments");

    const response = await fetch(
      "/api/post/getBy.php?" + searchParams.toString()
    );
    const data = await response.json();

    if (data.success === true) {
      setPost(data.data);
      setComments(data.data.comments);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (createCommentFormRef.current === null || post === undefined) {
      return;
    }

    const formData = new FormData(createCommentFormRef.current);
    formData.append("postId", String(post.id));

    const response = await fetch("/api/comment/create.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success === false) {
      return;
    }

    if (post.comments === undefined) {
      post.comments = [];
    }

    setComments([data.data, ...comments]);

    createCommentFormRef.current?.reset();
  };

  useEffect(() => {
    getPost();
    const createComment =
      new URLSearchParams(window.location.search).get("comment") === "true";

    if (createComment) {
      setCreateComment(true);
      commentsRef.current?.scrollIntoView();
      commentsRef.current?.focus();
    }
  }, []);

  if (post === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-96px)]">
      <button
        className="
        flex items-center
        px-4 py-2
        rounded-lg
        m-4
        group
        fixed
        bg-slate-200
        bg-opacity-50
      "
        onClick={() => navigate(-1)}
      >
        <BiArrowBack
          className="
          mr-2
          text-xl
          group-hover:text-blue-700
          group-hover:animate-pulse
        "
        />
        <span>Go Back</span>
      </button>
      <div className="flex flex-col items-center h-full mt-8 w-3/4 mx-auto">
        <img src={post.image} alt="" className="h-3/4 mb-4 shadow-xl" />
        <div className="shadow-xl w-full px-4 py-6">
          <h3
            className="
            text-2xl
            mb-2
          "
          >
            @{post.user?.name}
          </h3>
          <div className="text-xl">{post.description}</div>
        </div>

        <div className="mt-4 px-4 py-6 shadow-xl w-full" ref={commentsRef}>
          <div className="text-2xl font-bold">Comments</div>
          <form
            ref={createCommentFormRef}
            className="
            flex
            items-center
            mt-4
            "
            onSubmit={handleSubmitComment}
          >
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add a comment..."
              className="
                w-full
                px-4
                py-2
                border
                border-gray-300
                rounded-lg
                focus:outline-none
                focus:border-blue-500
              "
            />

            <span
              className="
                w-4
              "
            ></span>
            <input
              type="submit"
              value="Submit"
              className="
                px-4
                py-2
                rounded-lg
                bg-blue-500
                text-white
                font-bold
                cursor-pointer
              "
            />
          </form>
          
          {comments.map((comment) => (
            <div className="mt-4
            text-2xl
            font-bold
            bg-slate-200
            bg-opacity-50
            px-4
            py-3
            shadow-xl
            `">
              <div className="text-lg">{comment.text}</div>
              <div className="text-sm text-gray-500">
                @{comment.user?.name}

                <span className="mx-2">•</span>

                {new Date(comment.date).toLocaleString()}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
