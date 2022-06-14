import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import chatApi from "../../../api/chatApi";
import userApi from "../../../api/userApi";
import { SocketContext } from "../../../App";
import QuickViewUser from "../../../components/QuickViewUser";
import scrollToElement from "../../../myFunction/scrollToView";
import { addChannels } from "../chanelChatSlice";
import { addListMessage, addMessage } from "../messagesSlice";
import ChannelContent from "./ChannelContent";
import ChatForm from "./ChatForm";

function ChatMain({ currentUserChat }) {
  const socket = useContext(SocketContext);

  const params = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.current);
  const [user, setUser] = useState(currentUserChat);
  const [result, setResult] = useState(0);
  const [page, setPage] = useState(2);
  const [isLoadMore, setIsLoadMore] = useState(0);
  const pageEnd = useRef();
  const clickPosition = useSelector((state) => state.clickPosition);

  const messagesEndRef = useRef();

  const sendMessage = async (data) => {
    data.append("sender", auth._id);
    data.append("recipient", user._id);

    const res = await chatApi.createMessage(data);
    if (res.data.success) {
      dispatch(addChannels(res.data.conversation));
      dispatch(addMessage(res.data.newMessage));
      const data = {
        conversation: res.data.conversation,
        message: res.data.newMessage,
      };
      scrollToElement(messagesEndRef.current);
      socket.emit("addMessage", data);
    }
  };

  useEffect(() => {
    if (currentUserChat && clickPosition !== "sidebarRight") {
      setUser(currentUserChat);
    } else {
      const getUser = async () => {
        try {
          const resUser = await userApi.getUserById(params.id);
          if (resUser.data.message) {
            setUser(resUser.data.user);
          } else console.log(resUser);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
  }, [currentUserChat, params.id]);

  useEffect(() => {
    var mounted = true;

    if (mounted) {
      const getChannelContent = async () => {
        try {
          const res = await chatApi.getMessages(user._id);
          if (res.data.message) {
            dispatch(addListMessage(res.data.messages));
            setResult(res.data.result);
            scrollToElement(messagesEndRef.current);
            setPage(2);
          } else console.log(res);
        } catch (error) {}
      };
      getChannelContent();
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  // load more
  useEffect(() => {
    const pageEndRef = pageEnd.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );
    observer.observe(pageEndRef);
    return () => {
      observer.unobserve(pageEndRef);
    };
  }, [setIsLoadMore]);

  useEffect(() => {
    var mounted = true;
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        if (mounted) {
          const getChannelContent = async () => {
            try {
              const res = await chatApi.getMessages(user._id, page + 1);
              if (res.data.message) {
                dispatch(addListMessage(res.data.messages));
                setResult(res.data.result);
                setPage((p) => p + 1);
              } else console.log(res);
            } catch (error) {}
          };
          getChannelContent();
          setIsLoadMore(1);
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [isLoadMore]);

  return (
    <div className="flex-1 flex flex-col h-full rounded-xl ">
      <div className="h-24 flex items-center p-4 rounded-t-xl dark:bg-indigo-950 bg-white  border-b border-slate-200 dark:border-borderColorDark">
        {user && <QuickViewUser user={user} />}
      </div>
      <div className="h-[90%] dark:bg-indigo-950 shadow-xl w-full border- border-b dark:border-borderColorDark bg-white overflow-y-scroll flex flex-col-reverse p-4 scrollbar rounded-b-xl">
        <div ref={messagesEndRef}>
          <span className="text-transparent text-sm h-4">N</span>
        </div>
        <ChannelContent user={user} auth={auth} />
        <div ref={pageEnd}></div>
      </div>
      <div className="flex-1 justify-self-end flex justify-center items-center mt-4 rounded-lg dark:border-t bg-white border-borderColorDark dark:bg-indigo-950">
        <ChatForm onSubmit={sendMessage} />
      </div>
    </div>
  );
}

export default ChatMain;
