import PostType from "../../types/post";
import imageUrl from "../../assets/azamat-esmurziyev-qhdGyb-jw2M-unsplash.jpg";

const examplePosts: PostType[] = [
  {
    user: "manuel",
    description: "How to make a website",
    image: imageUrl,
    likes: [
      {
        user: "nico",
      },
      {
        user: "lukas",
      },
      {
        user: "michi",
      }
    ],
    comments: [
      {
        user: "nico",
        text: "hello world",
      },
      {
        user: "lukas",
        text: "moin meister",
      },
    ],
  },
  {
    user: "seppi",
    description: "some description",
    image: imageUrl,
    likes: [
      {
        user: "nico",
      },
      {
        user: "lukas",
      },
    ],
    comments: [
      {
        user: "michi",
        text: "servus",
      },
      {
        user: "nico",
        text: "toller post",
      },
    ],
  },
];

export default examplePosts;