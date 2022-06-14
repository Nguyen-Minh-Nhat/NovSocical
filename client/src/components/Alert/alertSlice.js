import { createSlice } from '@reduxjs/toolkit';
const initialState = { message: '', type: '' };

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		alerts: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { alerts } = alertSlice.actions;
export default alertSlice.reducer;
