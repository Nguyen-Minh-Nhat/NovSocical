import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLockScroll } from '../../Hooks/useLockScroll';
import { setModal } from './modalSlice';

function Modal({ children, closePosition }) {
	const { lockScroll, unlockScroll } = useLockScroll();
	const dispatch = useDispatch();
	const handleCloseForm = (e) => {
		if (e.target.classList.contains(`${closePosition || 'close-position'}`)) {
			const action = setModal({ isOpen: false, children: null });
			dispatch(action);
		}
	};
	useEffect(() => {
		lockScroll();
		return () => {
			unlockScroll();
		};
	}, []);
	return (
		<div
			className={`fixed w-screen h-screen bg-[rgba(0,0,0,0.5)] flex z-50 justify-center items-center ${
				closePosition || 'close-position'
			}`}
			onClick={handleCloseForm}
		>
			{children}
		</div>
	);
}

export default Modal;
