import { createSlice } from '@reduxjs/toolkit';
const initialState = false;

export const sidebarLeftSlice = createSlice({
	name: 'sidebarLeft',
	initialState,
	reducers: {
		toggle: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { toggle } = sidebarLeftSlice.actions;
export default sidebarLeftSlice.reducer;
