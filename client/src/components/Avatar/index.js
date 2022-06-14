import React from "react";
import CloudImg from "../../features/Post/components/CloudImg";

function Avatar({ size, avatar, custom }) {
  return (
    <div
      className={` relative ${
        size || "w-16 h-16"
      } rounded-[50%] bg-indigo-600 flex items-center justify-center  ${
        custom || ""
      }`}
    >
      <div className="w-[calc(100%_+_2px)] h-[calc(100%_+_2px)] border-2 cursor-pointer border-white dark:border-indigo-950 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute rounded-full"></div>
      <div className="w-full h-full rounded-full overflow-hidden ">
        <CloudImg publicId={avatar} />
      </div>
    </div>
  );
}

export default Avatar;
