import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ChatMain from "./components/ChatMain";
import SidebarChat from "./components/SidebarChat";
import { SocketContext } from "../../App";
import { useDispatch } from "react-redux";
import { setMode } from "./../../app/extraSlice/modeSlice";
import chatApi from "../../api/chatApi";
import { setChannels } from "./chanelChatSlice";

function Chat() {
  const params = useParams();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [currentUserChat, setCurrentUserChat] = useState();
  useEffect(() => {
    let setModeAction = setMode({ type: "chatMode" });
    dispatch(setModeAction);
    return () => {
      setModeAction = setMode({ type: "classicMode" });
      dispatch(setModeAction);
    };
  }, []);

  return (
    <div className="w-full pb-8 max-h-[90vh] h-full">
      <div className="w-full flex h-full rounded-xl overflow-hidden">
        <SidebarChat socket={socket} setCurrentUserChat={setCurrentUserChat} />
        {!Object.values(params)[0] ? (
          <div className="flex-1 flex justify-center items-center rounded-xl bg-indigo-850">
            <span className="text-4xl dark:text-white uppercase">
              Join a channel to chat with your friends
            </span>
          </div>
        ) : (
          <Routes>
            <Route
              path="/:id"
              element={
                <ChatMain socket={socket} currentUserChat={currentUserChat} />
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default Chat;
