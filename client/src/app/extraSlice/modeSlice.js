import { createSlice } from '@reduxjs/toolkit';
const initialState = { type: 'classicMode' };

export const modeSlice = createSlice({
	name: 'mode',
	initialState,
	reducers: {
		setMode: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
