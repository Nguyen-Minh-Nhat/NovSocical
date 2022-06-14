import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import QuickViewUser from "../QuickViewUser";
import SwitchBtn from "../SwitchBtn";

function NavbarMenu({ user, onLogOut }) {
  const toggleDarkMode = useContext(ThemeContext);
  const menuItem = [
    {
      title: "My account",
      icon: "fas fa-cog",
      event: () => {},
    },
    {
      title: "Help & support",
      icon: "fas fa-question-circle",
      event: () => {},
    },
    {
      title: "Dark mode",
      icon: "fas fa-moon",
      event: () => {},
    },
    {
      title: "Log Out",
      icon: "fas fa-sign-out-alt",
      event: onLogOut,
    },
  ];
  return (
    <div className="w-[27.4rem] right-0 -bottom-2 rounded-xl translate-y-full bg-slate-100 dark:bg-indigo-1050 dark:text-textColorDark shadow-xl absolute cursor-default overflow-hidden border border-solid border-slate-200 dark:border-indigo-1000">
      <ul className="flex w-full flex-col">
        <li className="flex w-full p-2 items-center border-b border-solid dark:border-borderColorDark">
          <div className="flex w-full p-2 cursor-pointer rounded-xl hover:bg-blue-200 dark:hover:bg-indigo-850  ">
            <QuickViewUser user={user} showEmail={true} />
          </div>
        </li>
        {menuItem.map((item) => (
          <li className="flex w-full p-2 items-center" key={item.title}>
            <div
              className="flex items-center text-3xl w-full p-2 cursor-pointer rounded-lg hover:bg-blue-200 dark:hover:bg-indigo-850"
              onClick={item.event}
            >
              <i className={`${item.icon} w-12`}></i>
              <span className=" text-2xl">{item.title}</span>

              {item.title === "Dark mode" && (
                <div onClick={() => toggleDarkMode()} className="ml-auto">
                  <SwitchBtn />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavbarMenu;
