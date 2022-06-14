import { createSlice } from "@reduxjs/toolkit";
let initialState = null;

export const clickPosition = createSlice({
  name: "clickPosition",
  initialState,
  reducers: {
    setClickPosition: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { setClickPosition } = clickPosition.actions;
export default clickPosition.reducer;
