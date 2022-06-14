import React from 'react';
import useClickOutside from '../../Hooks/useClickOutside';

function MenuButton({ children }) {
	const [refInside, isInside, setIsInside] = useClickOutside(false);

	return (
		<div
			ref={refInside}
			className="justify-self-end relative cursor-pointer"
			onClick={() => setIsInside(!isInside)}
		>
			<div className="] p-2  transition-all hover:bg-slate-200 flex justify-center items-center rounded-full dark:text-textColorDark">
				<i className="fa fa-ellipsis-h"></i>
			</div>
			{isInside && <>{children}</>}
		</div>
	);
}

export default MenuButton;
