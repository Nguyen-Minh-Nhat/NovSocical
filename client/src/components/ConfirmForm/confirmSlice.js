import { createSlice } from '@reduxjs/toolkit';
const initialState = { isOpen: false, value: -1, message: '' };

export const confirmFormSlice = createSlice({
	name: 'confirm',
	initialState,
	reducers: {
		setConfirmForm: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { setConfirmForm } = confirmFormSlice.actions;
export default confirmFormSlice.reducer;
