import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const miniChat = createSlice({
  name: "miniChat",
  initialState,
  reducers: {
    addMiniChat: (state, action) => {
      const existsIndex = state.findIndex(
        (miniChat) => miniChat._id === action.payload._id,
      );

      if (existsIndex === -1) state.push(action.payload);
      else {
        state.splice(existsIndex, 1);
        state.push(action.payload);
      }
    },
    removeMiniChat: (state, action) => {
      const removeIndex = state.findIndex(
        (miniChat) => miniChat._id === action.payload,
      );
      if (removeIndex !== -1) state.splice(removeIndex, 1);
    },
  },
});
export const { addMiniChat, removeMiniChat } = miniChat.actions;
export default miniChat.reducer;
