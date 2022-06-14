import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../components/Alert/alertSlice";
import confirmFormSlice from "../components/ConfirmForm/confirmSlice";
import loadingSlice from "../components/Loading/loadingSlice";
import modalSlice from "../components/Modal/modalSlice";
import sidebarLeftSlice from "../components/SidebarLeft/sidebarLeftSlice";
import sidebarRightSlice from "../components/SidebarRight/sidebarRightSlice";
import userReducer from "../features/Auth/userSlice";
import channelChatSlice from "../features/Chat/chanelChatSlice";
import clickPositionSlice from "../features/Chat/clickPositionSlice";
import messagesSlice from "../features/Chat/messagesSlice";
import miniChatSlice from "../features/Chat/miniChatSlice";
import followSlice from "../features/Follow/followSlice";
import peopleSlice from "../features/People/peopleSlice";
import postReducer from "../features/Post/postSlice";
import modeSlice from "./extraSlice/modeSlice";
import socketSlice from "./extraSlice/socketSlice";

const rootReducer = {
  user: userReducer,
  post: postReducer,
  alert: alertReducer,
  loading: loadingSlice,
  modal: modalSlice,
  sidebarLeft: sidebarLeftSlice,
  sidebarRight: sidebarRightSlice,
  confirmForm: confirmFormSlice,
  people: peopleSlice,
  mode: modeSlice,
  messages: messagesSlice,
  channelChat: channelChatSlice,
  miniChat: miniChatSlice,
  clickPosition: clickPositionSlice,
  socket: socketSlice,
  follow: followSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
