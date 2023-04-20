import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import UserType from "../types/user";

function Account() {
  const { name } = useParams();

  const [user, setUser] = useState<UserType>();

  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const getUser = async () => {
    const searchParams = new URLSearchParams();

    if (name === null || name === undefined) {
      searchParams.append("by", "session");
    } else {
      searchParams.append("by", "name");
      searchParams.append("name", name);
    }

    searchParams.append("include", "postCount");

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
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300"></div>
        <div className="text-2xl font-bold mt-4">{user.name}</div>

        <div className="mt-4">
          <div className="text-gray-500">Number of posts: {user.postCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Account;
