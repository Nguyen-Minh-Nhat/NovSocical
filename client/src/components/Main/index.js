import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
function Container() {
  const mode = useSelector((state) => state.mode.type);
  return (
    <div
      className={`flex w-full lg:px-[7.4rem] ${
        mode === "classicMode" ? " xl:px-[27rem] " : " "
      } justify-center h-full min-h-screen pt-32 px-4`}
    >
      <div
        className={`flex w-full justify-center  ${
          mode === "classicMode" ? "" : "items-center"
        } z-10`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Container;
