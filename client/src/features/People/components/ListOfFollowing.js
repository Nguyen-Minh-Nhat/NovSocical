import React, { useEffect, useState } from "react";
import { RiUserFollowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import QuickViewUser from "../../../components/QuickViewUser";
import { setClickPosition } from "../../Chat/clickPositionSlice";
function ListOfFollowing({ toggleMenu }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.type);
  const user = useSelector((state) => state.user.current);
  const [listOfFollowingUsers, setListOFFollowingUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getAllFollowingUsers = async () => {
      const res = await userApi.getAllFollowingUsers(user._id);
      if (res.data.success) {
        setListOFFollowingUsers(res.data.listOfFollowingUsers);
      }
    };
    if (user.following?.length > 0 && mounted) {
      getAllFollowingUsers();
    }
    return () => {
      mounted = false;
    };
  }, [user.following]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    // navigate(`/chat/${id}`);
    if (mode === "chatMode") {
      const action = setClickPosition("sidebarRight");
      dispatch(action);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="py-4 flex items-center font-bold text-slate-600 dark:text-textColorDark border-b-[0.05px] border-solid border-slate-200 dark:border-borderColorDark dark:bg-indigo-950 capitalize text-[2rem]">
        <RiUserFollowFill className={` ${!toggleMenu ? "flex-1" : "mr-4"}`} />
        {toggleMenu && <span>Following</span>}
      </div>
      <div className="flex flex-col ">
        {listOfFollowingUsers.map((user) => (
          <div onClick={handleClick} key={user._id} className="mb-4">
            <QuickViewUser
              user={user}
              onlyAvatar={!toggleMenu}
              showFollower={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ListOfFollowing);
