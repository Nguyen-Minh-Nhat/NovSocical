import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../Hooks/useWindowSize';
import { toggle as toggleLeft } from '../SidebarLeft/sidebarLeftSlice';
import { toggle as toggleRight } from '../SidebarRight/sidebarRightSlice';
import Navbar from './Navbar';

function Header() {
	const dispatch = useDispatch();
	const windowSize = useWindowSize();
	const mode = useSelector((state) => state.mode.type);

	useEffect(() => {
		let toggleLeftAction;
		let toggleRightAction;
		if (windowSize.width > 1280 && mode !== 'chatMode') {
			toggleLeftAction = toggleLeft(true);
			dispatch(toggleLeftAction);
			toggleRightAction = toggleRight(true);
			dispatch(toggleRightAction);
		} else {
			toggleLeftAction = toggleLeft(false);
			dispatch(toggleLeftAction);
			toggleRightAction = toggleRight(false);
			dispatch(toggleRightAction);
		}
	}, [windowSize.width, mode]);

	return (
		<div className="w-screen h-[6rem] z-50 shadow-lg bg-white dark:bg-indigo-950 fixed px-4 pr-8">
			<Navbar />
		</div>
	);
}

export default Header;
