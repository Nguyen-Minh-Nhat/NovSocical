import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addChannels } from "./features/Chat/chanelChatSlice";
import { addMessage } from "./features/Chat/messagesSlice";
import { addMiniChat } from "./features/Chat/miniChatSlice";
import { updatePost } from "./features/Post/postSlice";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};

const SocketClient = ({ socket }) => {
  const user = useSelector((state) => state.user.current);
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      socket.emit("joinUser", user);
    }
  }, [user._id]);
  const dispatch = useDispatch();
  const audioRef = useRef();
  //like
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      const action = updatePost(newPost);
      dispatch(action);
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  // // Comments
  // useEffect(() => {
  //     socket.on("createCommentToClient", (newPost) => {
  //         dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  //     });
  //     return () => socket.off("createCommentToClient");
  // }, [socket, dispatch]);
  // useEffect(() => {
  //     socket.on("deleteCommentToClient", (newPost) => {
  //         dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
  //     });
  //     return () => socket.off("deleteCommentToClient");
  // }, [socket, dispatch]);
  // // Follow
  // useEffect(() => {
  //     socket.on("followToClient", (newUser) => {
  //         dispatch({
  //             type: GLOBALTYPES.AUTH,
  //             payload: { ...auth, user: newUser },
  //         });
  //     });
  //     return () => socket.off("followToClient");
  // }, [socket, dispatch, auth]);
  // useEffect(() => {
  //     socket.on("unFollowToClient", (newUser) => {
  //         dispatch({
  //             type: GLOBALTYPES.AUTH,
  //             payload: { ...auth, user: newUser },
  //         });
  //     });
  //     return () => socket.off("unFollowToClient");
  // }, [socket, dispatch, auth]);
  // // Notification
  // useEffect(() => {
  //     socket.on("createNotifyToClient", (msg) => {
  //         dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
  //         if (notify.sound) audioRef.current.play();
  //         spawnNotification(
  //             msg.user.username + " " + msg.text,
  //             msg.user.avatar,
  //             msg.url,
  //             "V-NETWORK"
  //         );
  //     });
  //     return () => socket.off("createNotifyToClient");
  // }, [socket, dispatch, notify.sound]);
  // useEffect(() => {
  //     socket.on("removeNotifyToClient", (msg) => {
  //         dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
  //     });
  //     return () => socket.off("removeNotifyToClient");
  // }, [socket, dispatch]);
  //   Message
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      socket.on("addMessageToClient", (data) => {
        dispatch(
          addMiniChat(
            data.conversation.recipients.find(
              (recipient) => recipient._id !== user._id,
            ),
          ),
        );
        dispatch(addChannels(data.conversation));
        dispatch(addMessage(data.message));
      });
    }
    return () => {
      mounted = false;
      socket.off("addMessageToClient");
    };
  }, [socket, user]);
  // // Check User Online / Offline
  // useEffect(() => {
  //     socket.emit("checkUserOnline", auth.user);
  // }, [socket, auth.user]);
  // useEffect(() => {
  //     socket.on("checkUserOnlineToMe", (data) => {
  //         data.forEach((item) => {
  //             if (!online.includes(item.id)) {
  //                 dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
  //             }
  //         });
  //     });
  //     return () => socket.off("checkUserOnlineToMe");
  // }, [socket, dispatch, online]);
  // useEffect(() => {
  //     socket.on("checkUserOnlineToClient", (id) => {
  //         if (!online.includes(id)) {
  //             dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
  //         }
  //     });
  //     return () => socket.off("checkUserOnlineToClient");
  // }, [socket, dispatch, online]);
  // // Check User Offline
  // useEffect(() => {
  //     socket.on("CheckUserOffline", (id) => {
  //         dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
  //     });
  //     return () => socket.off("CheckUserOffline");
  // }, [socket, dispatch]);
  // // Call User
  // useEffect(() => {
  //     socket.on("callUserToClient", (data) => {
  //         dispatch({ type: GLOBALTYPES.CALL, payload: data });
  //     });
  //     return () => socket.off("callUserToClient");
  // }, [socket, dispatch]);
  // useEffect(() => {
  //     socket.on("userBusy", (data) => {
  //         dispatch({
  //             type: GLOBALTYPES.ALERT,
  //             payload: { error: `${call.username} is busy!` },
  //         });
  //     });
  //     return () => socket.off("userBusy");
  // }, [socket, dispatch, call]);
  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        {/* <source src={audiobell} type="audio/mp3" /> */}
      </audio>
    </>
  );
};

export default SocketClient;
