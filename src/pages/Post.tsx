import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostType from '../types/post';


function Post() {

  const {postId} = useParams();
  const [post, setPost] = useState<PostType>();

  const getPost = async () => {
    console.log(postId);
    
    if(postId === undefined) {
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
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  if(post === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-[calc(100vh-96px)]">
      <div className="flex flex-col items-center h-full mt-8">
        <img src={post.image} alt="" className="h-3/4" />
        <div className="text-2xl font-bold mt-4">{post.description}</div>
        <div className="text-2xl font-bold mt-4">@{post.user?.name}</div>

        <div className="mt-4">
          <div className="text-2xl font-bold">Comments</div>
          <pre>{JSON.stringify(post.comments, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default Post