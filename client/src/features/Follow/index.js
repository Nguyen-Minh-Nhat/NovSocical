import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import StorageKeys from "../../constants/storageKeys";
import { setUser } from "../Auth/userSlice";

function Follow({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [isFollowed, setIsFollowed] = useState();
  useEffect(() => {
    if (user?._id) {
      setIsFollowed(user.following.includes(id));
    }
  }, [user.following, id]);
  const handleFollow = async () => {
    const accessToken = localStorage.getItem(StorageKeys.accessToken);
    try {
      const res = await axiosClient.put(
        "user/follow",
        { friendID: id },
        {
          headers: { accessToken },
        },
      );
      if (res.data.success) {
        var newFollowing;
        if (res.data.state === 1) newFollowing = [...user.following, id];
        else
          newFollowing = user.following.filter((following) => following !== id);
        dispatch(setUser({ ...user, following: newFollowing }));
      }
    } catch (error) {}
  };
  return (
    <>
      {id !== user._id && (
        <div
          className={` cursor-pointer rounded-xl min-w-[8rem] flex justify-center items-center shadow py-2 px-4 transition-all duration-[0.1s] ${
            isFollowed
              ? "text-white bg-indigo-600"
              : "text-indigo-600 bg-slate-100"
          }`}
          onClick={handleFollow}
        >
          <span>{isFollowed ? "Followed" : "Follow"}</span>
        </div>
      )}
    </>
  );
}

export default Follow;
