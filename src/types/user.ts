/* 
    private int $id;
    private string $name;
    private string $email;
    private string $password;
    private string $userType; */

import PostType from "./post";

type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: string;

  postCount?: number;
  posts?: PostType[];
};

export default UserType;