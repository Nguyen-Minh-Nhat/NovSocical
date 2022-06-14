import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./components/Alert";
import { alerts } from "./components/Alert/alertSlice";
import CloseButton from "./components/CloseButton";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import ChatMain from "./features/Chat/components/ChatMain";
import { removeMiniChat } from "./features/Chat/miniChatSlice";

function PopupPage() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const loading = useSelector((state) => state.loading);
  const modal = useSelector((state) => state.modal);
  const miniChats = useSelector((state) => state.miniChat);
  const miniChatsDisplay = miniChats.slice(miniChats.length - 2);
  const mode = useSelector((state) => state.mode.type);

  const handleCloseMiniChat = (id) => {
    console.log(1);
    const action = removeMiniChat(id);
    dispatch(action);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        const alertAction = alerts("");
        dispatch(alertAction);
      }, 2500);
    }
  }, [alert]);
  return (
    <>
      {modal.isOpen && <Modal>{modal.children}</Modal>}
      {alert.message && <Alert type={alert.type} message={alert.message} />}
      {loading.loading && <Loading isOpenModal={modal.isOpen}></Loading>}
      {miniChatsDisplay?.length > 0 && mode === "classicMode" && (
        <div className="fixed z-50 right-[5%] bottom-0 flex space-x-10">
          {miniChatsDisplay.map((miniChat) => (
            <div
              key={miniChat._id}
              className=" w-[32rem] h-[46rem] rounded-t-xl overflow-hidden relative shadow-[0px_0px_60px_-15px_rgba(0,0,0,0.3)] border-slate-300 dark:border-borderColorDark"
            >
              <CloseButton
                onClick={() => handleCloseMiniChat(miniChat._id)}
                absolute={true}
                custom={" right-[3%] top-[3%] "}
              />
              <ChatMain currentUserChat={miniChat} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default PopupPage;
