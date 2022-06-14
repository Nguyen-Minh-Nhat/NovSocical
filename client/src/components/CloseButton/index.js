import React from "react";
import "../CloseButton/index.css";

function CloseButton({ onClick, size, absolute, custom }) {
  return (
    <div
      className={`${!absolute ? "" : "absolute "} 
        cursor-pointer ${
          size ? size : "w-12 h-12"
        } bg-slate-300 hover:bg-slate-400 rounded-full flex justify-center items-center close-position ${custom} z-50`}
      onClick={onClick ? onClick : () => {}}
    >
      <i className="fas fa-times font-thin close-position dark:text-black"></i>
      {/* <div className="user-card fixed">
        <div className="user-info">
          <icon></icon> Player b
        </div>
        <div className="user-hp"> HP </div>
      </div> */}
    </div>
  );
}

export default CloseButton;
