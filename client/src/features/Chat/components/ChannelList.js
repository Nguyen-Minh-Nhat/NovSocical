import React from "react";
import { useSelector } from "react-redux";
import Channel from "./Channel";

function ListOfChannels({ setCurrentUserChat }) {
  const listChannel = useSelector((state) => state.channelChat.channels);

  return (
    <div className="flex flex-col mt-4  max-h-[56rem] space-y-4 overflow-y-scroll scrollbar -mr-4">
      {listChannel &&
        listChannel.map((channel) => (
          <div
            key={channel._id}
            className="flex-1 p-4 bg-slate-100 dark:bg-indigo-1050 rounded-lg scroll-smooth hover:bg-slate-200 dark:hover:opacity-70 cursor-pointer "
          >
            <Channel
              channel={channel}
              setCurrentUserChat={setCurrentUserChat}
            />
          </div>
        ))}
    </div>
  );
}

export default ListOfChannels;
