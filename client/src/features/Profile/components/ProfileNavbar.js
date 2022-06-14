import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const stylesItem =
  "w-[calc(100%_/_4)] h-full flex justify-center items-center transition-all duration-200";

function ProfileNavbar({ navbarItem }) {
  const [activeTab, setActiveTab] = useState(navbarItem[0]?.path);
  return (
    <div className="h-[5.2rem] w-full bg-white dark:bg-indigo-950 shadow-md rounded-xl flex items-center overflow-hidden ">
      {navbarItem.map((item) => (
        <Link
          to={item.path}
          key={item.title}
          onClick={() => setActiveTab(item?.path)}
          className={`${
            activeTab === item?.path
              ? `${stylesItem} bg-[#bfdbfe] text-indigo-600 rounded-xl`
              : `${stylesItem} text-gray-600 dark:text-textColorDark hover:dark:text-white`
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default React.memo(ProfileNavbar);
