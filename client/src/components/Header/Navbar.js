import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../features/Auth/userSlice";
import Search from "../../features/Search";
import useClickOutside from "../../Hooks/useClickOutside";
import Avatar from "../Avatar";
import { toggle } from "../SidebarLeft/sidebarLeftSlice";
import NavbarMenu from "./NavbarMenu";
import { IoIosChatboxes } from "react-icons/io";
import SidebarChat from "../../features/Chat/components/SidebarChat";

function Navbar() {
  const user = useSelector((state) => state.user.current);
  const toggleMenu = useSelector((state) => state.sidebarLeft);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refInside, isInside, setIsInside] = useClickOutside(false);
  const [refInsideChat, isInsideChat, setIsInsideChat] = useClickOutside(false);
  const handleLogout = () => {
    const action = logOut();
    dispatch(action);
  };
  const reLoadPage = () => {
    navigate("/");
  };

  return (
    <div className="h-full w-full flex gap-4 items-center justify-between">
      <div className="flex items-center ">
        <span
          onClick={() => {
            const action = toggle(!toggleMenu);
            dispatch(action);
          }}
          className="cursor-pointer text-4xl"
        >
          <i className="fas fa-bars dark:text-textColorDark"></i>
        </span>
        <div
          className="mx-4 md:mx-[3.6rem] text-indigo-600 font-bold text-4xl cursor-pointer"
          onClick={reLoadPage}
        >
          NovS
        </div>
      </div>
      <Search />
      <div className="flex gap-x-4 items-center">
        <div
          ref={refInsideChat}
          className="w-16 h-16  rounded-full flex justify-center text-4xl items-center bg-[#e4e6eb] dark:bg-indigo-850 hover:bg-[#d9dbdd] cursor-pointer"
        >
          <IoIosChatboxes onClick={() => setIsInsideChat(!isInsideChat)} />
          {isInsideChat && (
            <div className="absolute top-full right-4 z-50">
              <SidebarChat />
            </div>
          )}
        </div>
        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#e4e6eb] hover:bg-[#d9dbdd] cursor-pointer">
          <i className="fas fa-bell text-3xl"></i>
        </div>
        <div ref={refInside} className="cursor-pointer relative">
          {" "}
          <div onClick={() => setIsInside(!isInside)}>
            {" "}
            {user.avatar && <Avatar avatar={user.avatar} />}
          </div>
          <div>
            {isInside && <NavbarMenu user={user} onLogOut={handleLogout} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Navbar);
