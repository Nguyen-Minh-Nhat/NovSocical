import React, { useEffect, useRef, useState } from 'react';

export default function useClickOutside(initialState) {
	const [isInside, setIsInside] = useState(initialState);
	const refInside = useRef(null);
	const handleClickOutside = (e) => {
		if (refInside.current && !refInside.current.contains(e.target)) {
			setIsInside(false);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
	return [refInside, isInside, setIsInside];
}
