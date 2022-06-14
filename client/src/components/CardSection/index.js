import React from "react";

function CardSection({ children, title, close }) {
  return (
    <div className="w-full bg-white dark:text-textColorDark text-slate-600 dark:bg-indigo-950 rounded-xl flex flex-col overflow-hidden">
      <div className="py-4 h-full justify-between font-bold  px-4 border-b-[0.05px] border-solid border-slate-200 dark:border-borderColorDark dark:bg-indigo-950 capitalize flex items-center text-[2rem]">
        {title}
        {close ? close : ""}
      </div>
      <div className="p-4"> {children}</div>
    </div>
  );
}

export default CardSection;
