import React from 'react';
export const useLockScroll = () => {
	const lockScroll = React.useCallback(() => {
		// ...
		document.body.style.paddingRight = 'var(--scrollbar-compensation)';
		document.body.style.overflow = 'hidden';
		document.body.dataset.scrollLock = 'true';
	}, []);

	const unlockScroll = React.useCallback(() => {
		// [data - scroll - lock];
		document.body.style.overflow = 'unset';
		delete document.body.dataset.scrollLock;
		document.body.style.setProperty('--scrollbar-compensation', `0px`);
	}, []);

	React.useLayoutEffect(() => {
		const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
		document.body.style.setProperty(
			'--scrollbar-compensation',
			`${scrollBarCompensation}px`
		);
	}, []);

	// ...

	return {
		lockScroll,
		unlockScroll,
	};
};
