import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';
import ProfileInfo from './components/ProfileInfo';
import ProfileNavbar from './components/ProfileNavbar';
import Timeline from './Pages/Timeline';

function Profile() {
	let params = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({ _id: params.id, followers: [] });
	const [paramsId, setParamsId] = useState(params.id);
	const ownUser = useSelector((state) => state.user.current);
	const [navbarItem, setNavbarItem] = useState([]);
	useEffect(() => {
		if (!paramsId) {
			setParamsId(ownUser._id);
			return;
		}
		setParamsId(params.id);
	}, [params.id]);
	useEffect(() => {
		if (!paramsId) return;
		setNavbarItem([
			{
				title: 'Timeline',
				path: paramsId,
			},
			{
				title: 'About',
				path: paramsId + '/about',
			},
			{
				title: 'Friends',
				path: paramsId + '/friends',
			},
			{
				title: 'Photos',
				path: paramsId + '/photos',
			},
		]);
		const getUserById = async () => {
			try {
				const res = await userApi.getUserById(paramsId);
				if (res.data.success) {
					setUser(res.data.user);
				} else {
					console.log(res);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getUserById();
		navigate(`/profile/${paramsId}`);
	}, [paramsId]);
	return (
		<div className="w-full flex flex-col space-y-6 ">
			<ProfileInfo user={user} />
			{navbarItem.length > 0 && <ProfileNavbar navbarItem={navbarItem} />}
			<Routes>
				<Route path={`/${params.id}`} element={<Timeline user={user} />} />
				<Route
					path={`/${params.id}/photos`}
					element={<Timeline user={user} />}
				/>
			</Routes>
		</div>
	);
}

export default Profile;
