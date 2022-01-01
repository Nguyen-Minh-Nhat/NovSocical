import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import Avatar from '../Avatar';
import Button from '../Button';

function Navbar() {
	const user = useSelector((state) => state.user.current);
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState(``);
	const [buttonType, setButtonType] = useState('Login');
	const handleLogout = () => {
		const action = logout();
		dispatch(action);
	};
	useEffect(() => {
		if (user.userID) {
			setAvatar(user.avatar);
			setButtonType('Logout');
		} else {
			setAvatar(``);
			setButtonType('Login');
		}
	}, [user]);

	return (
		<div className="h-full flex items-center px-12 justify-between shadow">
			<Link to="/home">
				<span className="text-indigo-600 font-bold text-4xl">Veta</span>
			</Link>
			<div className="flex  gap-x-4 items-center">
				{avatar && <Avatar avatar={avatar} />}
				<Link to="/login">
					<Button>
						<div onClick={handleLogout}>{buttonType}</div>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
