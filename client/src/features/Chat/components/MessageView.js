import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import CloudImg from "../../Post/components/CloudImg";

function MessageView({ message, isAuth, user, isShowAvatar }) {
  const navigate = useNavigate();
  return (
    <>
      {!isAuth ? (
        <div
          className={`flex w-full items-end h-full relative ${
            isShowAvatar ? "mb-4" : ""
          }`}
        >
          {isShowAvatar ? (
            <div
              onClick={(e) => {
                navigate(`/profile/${user._id}`);
              }}
            >
              <Avatar avatar={user.avatar} size={"w-12 h-12"} />
            </div>
          ) : (
            <div className="w-12 h-12"></div>
          )}

          <div className="max-w-[50%] min-w-[5%] mt-2">
            {message.image && (
              <div className="w-[20rem] mx-4 max-h-[40rem] border border-slate-100 dark:border-borderColorDark rounded-xl">
                <CloudImg publicId={message.image} />
              </div>
            )}
            {message.text && (
              <div className="p-2 mx-4 border rounded-xl rounded-bl-none bg-slate-300 word-break: break-all  ">
                <>{message.text}</>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {message.image && (
            <div className="w-[20rem] mx-4 h-[40rem]  self-end border border-slate-100 dark:border-borderColorDark rounded-xl ">
              <CloudImg publicId={message.image} />
            </div>
          )}
          {message.text && (
            <div className="self-end word-break: break-all max-w-[50%] py-2 px-4 mx-4 bg-indigo-600 text-white rounded-xl mt-2 rounded-br-none ">
              {message.text}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MessageView;
