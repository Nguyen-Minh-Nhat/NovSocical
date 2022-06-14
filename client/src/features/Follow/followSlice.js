import { createSlice } from "@reduxjs/toolkit";
const initialState = { followers: [], following: [] };

export const followSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    addFollowers: (state, action) => {
      state.followers.push(action.payload.followers);
    },
    removeFollowers: (state, action) => {
      state.followers.splice(
        state.followers.indexOf(
          (followers) => action.payload.followers._id === followers._id,
        ),
        1,
      );
    },
    setFollowing: (state, action) => {
      state.following = action.payload.Following;
    },
    addFollowing: (state, action) => {
      state.following.push(action.payload.following);
    },
    removeFollowing: (state, action) => {
      state.following.splice(
        state.following.indexOf(
          (Following) => action.payload.following._id === Following._id,
        ),
        1,
      );
    },
  },
});
export const {
  setFollowers,
  setFollowing,
  addFollowers,
  addFollowing,
  removeFollowers,
  removeFollowing,
} = followSlice.actions;
export default followSlice.reducer;
