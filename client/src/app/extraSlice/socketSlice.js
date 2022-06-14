import { createSlice } from "@reduxjs/toolkit";
const initialState = { type: "classicsocket" };

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
