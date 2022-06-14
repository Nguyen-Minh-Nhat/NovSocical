import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import chatApi from "../../../api/chatApi";
import SearchBar from "../../Search/SearchBar";
import { setChannels } from "../chanelChatSlice";
import ChannelList from "./ChannelList";

function SidebarChat({ socket, setCurrentUserChat }) {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getConversations = async () => {
        try {
          const res = await chatApi.getConversations();
          if (res.data.message) {
            const action = setChannels({
              channels: res.data.conversations,
            });
            dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getConversations();
    }
    return () => (mounted = false);
  }, []);

  return (
    <div className="h-full w-[28rem] bg-slate-50 dark:bg-indigo-950 shadow-custom mr-4 rounded-xl border-r dark:border-slate-700 p-4">
      <div className="h-[6rem] py-4 flex items-center ">
        <span className="text-4xl dark:text-textColorDark">Chats</span>
      </div>
      <SearchBar onSubmit={onSubmit} />
      <div className="py-4 max-h-[68.4rem] relative">
        <span className="dark:text-textColorDark text-3xl ">Recently Chat</span>
        <ChannelList socket={socket} setCurrentUserChat={setCurrentUserChat} />
      </div>
    </div>
  );
}

export default React.memo(SidebarChat);
