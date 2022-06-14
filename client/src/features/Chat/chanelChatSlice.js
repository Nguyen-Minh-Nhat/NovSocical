import { createSlice } from '@reduxjs/toolkit';
import updateList from './../../myFunction/updateList';
const initialState = { channels: [] };

export const channelChatSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		setChannels: (state, action) => {
			state.channels = action.payload.channels;
		},
		addChannels: (state, action) => {
			const indexUpdate = state.channels.findIndex(
				(channels) => channels._id === action.payload._id
			);

			if (indexUpdate !== -1) {
				state.channels.splice(indexUpdate, 1);
				state.channels.unshift(action.payload);
			} else state.channels = [action.payload, ...state.channels];
		},
	},
});
export const { setChannels, addChannels } = channelChatSlice.actions;
export default channelChatSlice.reducer;
