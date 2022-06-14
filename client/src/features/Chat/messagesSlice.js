import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const messages = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const indexChannelAdd = state.findIndex(
        (channel) =>
          channel._id === action.payload.conversation,
      );
      if (indexChannelAdd !== -1) {
        state[indexChannelAdd].messages.unshift(
          action.payload,
        );
      } else {
        state.push({
          _id: action.payload.conversation,
          members: [
            action.payload.sender,
            action.payload.recipient,
          ],
          messages: [action.payload],
        });
      }
    },
    addListMessage: (state, action) => {
      const indexIfExists = state.findIndex(
        (channel) =>
          channel._id === action.payload[0].conversation,
      );
      if (indexIfExists !== -1) {
        state[indexIfExists].messages = action.payload;
      } else {
        state.push({
          _id: action.payload[0].conversation,
          members: [
            action.payload[0].sender,
            action.payload[0].recipient,
          ],
          messages: action.payload,
        });
      }
    },
  },
});
export const { addMessage, addListMessage } =
  messages.actions;
export default messages.reducer;
