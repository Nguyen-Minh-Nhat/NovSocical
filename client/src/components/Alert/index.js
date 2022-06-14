import React, { useEffect, useState } from 'react';

function Alert({ type, message }) {
	const [style, setStyle] = useState();
	useEffect(() => {
		if (type === 'success')
			setStyle(
				'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
			);
		else if (type === 'failure')
			setStyle('text-red-700 bg-red-100  dark:bg-red-200 dark:text-red-800');
	}, []);

	return (
		<div
			className={`fixed z-50 left-1/2 -translate-x-1/2 top-[5%] flex p-4 mb-4 text-xl rounded-lg ${style}`}
			role="alert"
		>
			<div>
				<span className="font-medium">{type}!</span> {message}
			</div>
		</div>
	);
}

export default Alert;
