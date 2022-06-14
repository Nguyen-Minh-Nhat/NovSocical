import React, { useState } from 'react';

function SwitchBtn() {
	const [toggle, setToggle] = useState(localStorage.theme === 'dark');
	return (
		<div
			className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 dark:bg-indigo-900 rounded-full p-1 cursor-pointer"
			onClick={() => {
				setToggle(!toggle);
			}}
		>
			<div
				className={`bg-white dark:bg-indigo-950 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md 
         transform" ${toggle ? 'ml-auto' : ''}`}
			></div>
		</div>
	);
}

export default SwitchBtn;
