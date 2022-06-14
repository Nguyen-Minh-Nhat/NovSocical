import { createSlice } from '@reduxjs/toolkit';
const initialState = false;

export const sidebarRightSlice = createSlice({
	name: 'sidebarRight',
	initialState,
	reducers: {
		toggle: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { toggle } = sidebarRightSlice.actions;
export default sidebarRightSlice.reducer;
