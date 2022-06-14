import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "../../api/postApi";
import compareDate from "../../myFunction/compareDate";

export const createPost = createAsyncThunk("posts/create", async (payload) => {
  try {
    const res = await postApi.create(payload);
    if (res.data.success) {
      console.log(1);
      console.log(res);
    } else console.log(res);
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    pending: true,
  },
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload;
    },
    loadMorePosts: (state, action) => {
      state.postList = [...state.postList, ...action.payload];
    },
    addNewPost: (state, action) => {
      state.postList.unshift(action.payload);
    },
    deletePost: (state, action) => {
      const postList = state.postList.filter(
        (post) => post._id !== action.payload,
      );
      state.postList = postList;
    },
    updatePost: (state, action) => {
      const indexOfPostUpdate = state.postList.findIndex(
        (post) => post._id === action.payload._id,
      );
      state.postList[indexOfPostUpdate] = action.payload;
    },
  },
});

const { actions, reducer } = postSlice;
export const {
  setPostList,
  addNewPost,
  deletePost,
  updatePost,
  loadMorePosts,
} = actions;
export default reducer;
