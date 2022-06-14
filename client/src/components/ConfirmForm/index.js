import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import CardSection from '../CardSection';
import CloseButton from '../CloseButton';
import { loading } from '../Loading/loadingSlice';
import Modal from '../Modal';
import { setModal } from '../Modal/modalSlice';

function ConfirmForm({ confirmAction, message }) {
	const dispatch = useDispatch();
	const handleConfirm = async (data) => {
		let loadingAction = loading({ loading: true });
		dispatch(loadingAction);
		if (data === 1) await confirmAction();

		loadingAction = loading({ loading: false });
		const setModalAction = setModal({ isOpen: false, type: null, content: {} });
		dispatch(loadingAction);
		dispatch(setModalAction);
	};

	return (
		<div className="w-[56rem]">
			<CardSection title={'Confirm'} close={<CloseButton />}>
				<div className="flex flex-col space-y-4 w-full">
					<div>{message}</div>
					<div className="flex self-end space-x-4 ">
						<Button onClick={() => handleConfirm(1)} custom={'shadow-none'}>
							Yes
						</Button>
						<Button
							onClick={() => handleConfirm(0)}
							custom={
								'bg-transparent text-black hover:bg-slate-100 shadow-none dark:text-textColorDark dark:hover:bg-indigo-850'
							}
						>
							Cancel
						</Button>
					</div>
				</div>
			</CardSection>
		</div>
	);
}

export default ConfirmForm;
