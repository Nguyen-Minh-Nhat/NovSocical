import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import { setModal } from '../../../components/Modal/modalSlice';
import ProFileEditForm from './ProFileEditForm';

function ProfileEdit() {
	const dispatch = useDispatch();

	const handleEditProfile = () => {
		const action = setModal({
			isOpen: true,
			children: <ProFileEditForm />,
		});
		dispatch(action);
	};
	return (
		<div onClick={handleEditProfile}>
			<Button shadow={'shadow-none'}>
				<RiEdit2Fill className="mr-2" />
				Edit Profile
			</Button>
		</div>
	);
}

export default ProfileEdit;
