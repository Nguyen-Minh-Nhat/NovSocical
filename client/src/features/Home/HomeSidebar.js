import React from "react";
import SuggestionUsers from "./SuggestionUsers";

function HomeSidebar() {
  return (
    <div className="w-[32rem] self-start flex-col space-y-8 ml-8 rounded-xl hidden lg:flex">
      <SuggestionUsers />
    </div>
  );
}

export default HomeSidebar;
