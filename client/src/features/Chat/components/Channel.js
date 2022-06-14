import React, { useEffect, useState } from "react";
import QuickViewUser from "../../../components/QuickViewUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClickPosition } from "../clickPositionSlice";

function Channel({ channel, setCurrentUserChat }) {
  const auth = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const handleClick = (user) => {
    navigate(`/chat/${user._id}`);
    setCurrentUserChat(user);
    dispatch(setClickPosition("sidebarChat"));
  };
  useEffect(() => {
    const newList = channel.recipients.filter(
      (member) => member._id !== auth._id,
    );
    setMemberList(newList);
  }, [channel, auth]);

  return (
    <>
      {memberList?.length === 1 && (
        <div onClick={() => handleClick(memberList[0])}>
          {" "}
          <QuickViewUser user={memberList[0]} other={channel.text} />
        </div>
      )}
    </>
  );
}

export default Channel;
