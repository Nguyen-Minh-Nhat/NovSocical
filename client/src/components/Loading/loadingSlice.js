import { createSlice } from '@reduxjs/toolkit';
const initialState = { loading: false };

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		loading: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { loading } = loadingSlice.actions;
export default loadingSlice.reducer;
