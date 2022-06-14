import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Follow from '../../Follow';
import ProfileEdit from './ProfileEdit';

function ProfileInfo({ user }) {
	const mainUser = useSelector((state) => state.user.current);
	const socialInfo = [
		{
			title: 'Follower',
			number: user.followers ? user.followers.length : '0',
		},
		{
			title: 'Following',
			number: user.following ? user.following.length : '0',
		},
	];
	return (
		<div className="w-full h-[33.4rem] bg-white dark:bg-indigo-950 rounded-lg flex flex-col overflow-hidden">
			<div className="h-[24.6rem] w-full bg-blue-400 rounded-lg"></div>
			<div className="w-full relative bg-white dark:bg-indigo-950 flex-1 flex items-center p-4">
				<div className="absolute -top-full flex flex-col left-1/2 -translate-x-1/2  items-center ">
					<Avatar size="h-48 w-48 mb-4" avatar={user.avatar} />
					<span className="text-4xl dark:text-textColorDark">{user.name}</span>
				</div>
				<ul className="flex ml-auto space-x-6">
					{socialInfo.map((item) => (
						<li className="flex space-x-4 items-center" key={item.title}>
							<span className="dark:text-white">{item.title}</span>
							<span className="text-slate-500 ">{item.number}</span>
						</li>
					))}
					<Follow id={user._id} listOfFollowers={user.followers} />
					{mainUser._id === user._id && <ProfileEdit />}
				</ul>
			</div>
		</div>
	);
}

export default ProfileInfo;
