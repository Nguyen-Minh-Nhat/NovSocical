import { createSlice } from '@reduxjs/toolkit';
const initialState = { isOpen: false, children: null };

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setModal: (state, action) => {
			return (state = action.payload);
		},
	},
});
export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
