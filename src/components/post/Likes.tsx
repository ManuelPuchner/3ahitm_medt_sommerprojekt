import React from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

type LikesProps = {
  handleLike: () => void;
  isLiked: boolean;
  numberOfLikes: number;
};
export function Likes({ handleLike, isLiked, numberOfLikes }: LikesProps) {
  return (
    <div className="likes-wrapper flex">
      <div className="flex items-center mr-2">
        <div>
          gefällt <span>{numberOfLikes}</span> mal
        </div>
      </div>
      <div className="" onClick={handleLike}>
        {isLiked && <HiHeart className="h-8 w-8 text-primary-red transition" />}
        {!isLiked && <HiOutlineHeart className="h-8 w-8 transition" />}
      </div>
    </div>
  );
}
