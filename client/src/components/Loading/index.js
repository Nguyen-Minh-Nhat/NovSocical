import React, { useEffect } from 'react';
import Spinner from '../Spinner';

function Loading() {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);
	return (
		<div className="fixed flex items-center justify-center z-50 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] flex-grow-0">
			<div className="flex flex-col items-center space-y-2 ">
				<Spinner custom="h-12 w-12" />
			</div>
		</div>
	);
}

export default Loading;
