import { createSlice } from '@reduxjs/toolkit';
const initialState = { followers: [], followings: [] };

export const peopleSlice = createSlice({
	name: 'people',
	initialState,
	reducers: {
		setFollowers: (state, action) => {
			return (state.followers = action.payload);
		},
		setFollowings: (state, action) => {
			return (state.followings = action.payload);
		},
	},
});
export const { setFollowers, setFollowings } = peopleSlice.actions;
export default peopleSlice.reducer;
