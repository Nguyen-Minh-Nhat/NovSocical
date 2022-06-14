import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import menuItem from "../../constants/menuItem";

function Menu({ toggleMenu }) {
  const userID = useSelector((state) => state.user.current._id);
  const stylesItem =
    "h-20 flex items-center rounded-xl border-l-2 transition-all duration-[0.15s] border-solid border-transparent -mx-4 text-3xl group ";
  return (
    <div className="w-full flex flex-col">
      {menuItem.map((item) => (
        <NavLink
          to={`${
            item.path === "/profile" ? item.path + "/" + userID : item.path
          }`}
          key={item.title}
          className={({ isActive }) =>
            isActive
              ? `bg-[#bfdbfe] ${stylesItem} border-indigo-600 text-indigo-600`
              : ` ${stylesItem}dark:text-white opacity-60 hover:opacity-100`
          }
        >
          <i className={`${item.icon} w-10 mx-5`} />{" "}
          <span
            className={`font-normal ${toggleMenu ? "inline-block" : "hidden"}`}
          >
            {item.title}
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default Menu;
