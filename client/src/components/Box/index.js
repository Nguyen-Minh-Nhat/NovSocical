import React from "react";

function Box({
  children,
  width,
  height,
  flex,
  flexCol,
  p,
  bg,
  custom,
  rounded,
}) {
  return (
    <div
      className={`${custom} ${rounded || "rounded-xl"}  ${
        bg || "bg-white shadow"
      } ${
        p || "p-4"
      } inline-block ${flex} ${flexCol} ${width} ${height} max-w-full dark:bg-indigo-950 dark:text-textColorDark`}
    >
      {children}
    </div>
  );
}

export default Box;
