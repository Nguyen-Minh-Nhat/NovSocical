import React from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";

function SidebarLeft() {
  const toggleMenu = useSelector((state) => state.sidebarLeft);

  return (
    <div
      className={`p-[1.6rem] lg:translate-x-0 sm:w-[6.4rem] xl:w-[25.2rem] dark:border-r border-borderColorDark  z-20 pt-[8rem] h-full transition-all fixed bg-white dark:bg-indigo-950 shadow-lg ${
        toggleMenu
          ? "w-[25.2rem] sm:w-[25.2rem] translate-x-0"
          : "xl:w-[6.4rem] -translate-x-full"
      }`}
    >
      <Menu toggleMenu={toggleMenu} />
    </div>
  );
}

export default SidebarLeft;
