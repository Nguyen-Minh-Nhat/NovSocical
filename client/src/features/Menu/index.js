import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '../../components/Box';
import menuItem from '../../constants/menuItem';

function Menu() {
	return (
		<Box flex="flex" flexCol="flex-col" p="py-8">
			{menuItem.map((item) => (
				<NavLink
					to={item.path}
					key={item.title}
					className={`h-20 flex items-center border-l-4 transition-all duration-[0.15s] border-solid text-gray-600 border-transparent -mx-4 text-3xl hover:bg-slate-300 hover:border-indigo-600 group`}
				>
					<i className={`${item.icon} w-10 mx-10`} />{' '}
					<span className="font-bold  group-hover:text-indigo-600">
						{item.title}
					</span>
				</NavLink>
			))}
		</Box>
	);
}

export default Menu;
