import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListOfFollowing from "../../features/People/components/ListOfFollowing";
import { toggle } from "./sidebarRightSlice";

function SidebarRight() {
  const dispatch = useDispatch();
  const toggleMenu = useSelector((state) => state.sidebarRight);
  const handleToggleMenu = () => {
    const action = toggle(!toggleMenu);
    dispatch(action);
  };
  return (
    <div
      className={`z-20 lg:translate-x-0  dark:border-l border-borderColorDark sm:w-[6.4rem] xl:w-[25.2rem] h-full fixed bg-white shadow-lg right-0 ${
        toggleMenu
          ? "w-[25.2rem] sm:w-[25.2rem] translate-x-0"
          : "xl:w-[6.4rem] translate-x-full"
      } group body_scrollbar transition-all`}
    >
      <div className="w-full h-full pt-32 p-4 z-10 bg-white dark:bg-indigo-950">
        <ListOfFollowing toggleMenu={toggleMenu} />
      </div>
      <div
        className={`w-16 h-16 bg-indigo-600 absolute left-0 top-[8.6rem] 
        transition-all flex rounded-tl-full rounded-bl-full justify-center 
        items-center text-white group-hover:-translate-x-full cursor-pointer -z-10 ${
          toggleMenu ? "translate-x-0" : "-translate-x-full lg:-translate-x-0 "
        }`}
        onClick={handleToggleMenu}
      >
        {toggleMenu ? (
          <i className="fas fa-arrow-right"></i>
        ) : (
          <i className="fas fa-arrow-left"></i>
        )}
      </div>
    </div>
  );
}

export default SidebarRight;
