import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageView from "./MessageView";

function ChannelContent({ user, auth }) {
  const listOfMessages = useSelector((state) => state.messages);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (listOfMessages && user) {
      const newList = listOfMessages.find((messages) =>
        messages.members.includes(user._id),
      );
      if (newList) {
        setMessages(newList.messages);
      } else setMessages([]);
    }
  }, [user, listOfMessages]);
  return (
    <>
      {messages?.length > 0 &&
        messages.map((message, index) => (
          <MessageView
            message={message}
            key={message._id}
            user={message.sender === auth._id ? auth : user}
            isAuth={auth._id === message.sender}
            isShowAvatar={
              messages[index - 1]?.sender === auth._id || index === 0
            }
          />
        ))}
    </>
  );
}

export default ChannelContent;
