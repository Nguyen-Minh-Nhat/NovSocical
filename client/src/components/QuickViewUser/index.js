import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addMiniChat } from "../../features/Chat/miniChatSlice";
import { setClickPosition } from "../../features/Chat/clickPositionSlice";
import QuickViewProfile from "../QuickViewProfile";

function QuickViewUser({ user, onlyAvatar, showEmail, showFollower, other }) {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode.type);
  const dispatch = useDispatch();

  const handleViewProfile = (e) => {
    navigate(`/profile/${user._id}`);
  };
  const handleJoinChat = (e) => {
    navigate(`/chat/${user._id}`);
  };
  const handleClickAvatar = (e) => {
    if (mode === "classicMode") {
      dispatch(addMiniChat(user));
      dispatch(setClickPosition(""));
      return;
    } else if (mode === "chatMode") {
      handleJoinChat(e);
    } else if (mode !== "chatMode") {
      handleViewProfile(e);
    }
  };
  const handleClickName = (e) => {
    handleViewProfile(e);
  };
  return (
    <div
      className={`flex w-full
     h-full items-center relative`}
    >
      <div className="flex-shrink-0">
        <div onClick={(e) => handleClickAvatar(e)}>
          <Avatar avatar={user.avatar} />
        </div>
      </div>
      {!onlyAvatar && (
        <div className="flex flex-col  ml-4 justify-between flex-1 overflow-hidden">
          <span className="flex-1 max-full overflow-hidden text-2xl w-full relative font-medium dark:text-textColorDark whitespace-nowrap hover:underline cursor-pointer text-ellipsis">
            <span onClick={handleClickName}> {user.name}</span>
          </span>

          {showEmail && <span className="text-lg">{user.email}</span>}
          {showFollower && (
            <span className="text-lg flex h-full dark:text-textColorDark">
              <FaUserFriends className="text-2xl inline mr-2 " />
              {user.followers.length} Follower
            </span>
          )}
          {other && (
            <span className="text-2xl justify-self-end opacity-50 dark:text-textColorDark">
              {other}
            </span>
          )}
        </div>
      )}
      {/* {isViewProfile && (
        <div
          className="absolute top-0 left-0 z-50"
          onMouseLeave={() => setIsViewProfile(false)}
        >
          <QuickViewProfile />
        </div>
      )} */}
    </div>
  );
}

export default QuickViewUser;
