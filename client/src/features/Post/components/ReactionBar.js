import React from 'react';
import reactionIcons from '../../../assets/reactionIcons';
const listOfReactions = [
	{
		id: 'like',
		description: 'Like',
		img: reactionIcons.like,
	},
	{
		id: 'love',
		description: 'Love',
		img: reactionIcons.love,
	},
	{
		id: 'haha',
		description: 'Haha',
		img: reactionIcons.haha,
	},
	{
		id: 'sad',
		description: 'Sad',
		img: reactionIcons.sad,
	},
	{
		id: 'angry',
		description: 'Angry',
		img: reactionIcons.angry,
	},
];
const handleReaction = async (reaction) => {
	console.log(reaction);
};

function ReactionBar({ postID }) {
	return (
		<div className="flex p-2 bg-slate-50 border border-solid border-slate-300 dark:border-indigo-1000 rounded-full dark:bg-indigo-950 shadow cursor-pointer space-x-2 justify-self-start">
			{listOfReactions.map((reaction) => (
				<div
					key={reaction.id}
					className="flex-1 w-16 h-16 cursor-pointer hover:-translate-y-1 transition-all relative group"
					onClick={() => handleReaction(reaction.id)}
				>
					<div className="rounded-xl p-1 absolute  top-0 -translate-x-1/2 left-1/2 -translate-y-[105%] hidden group-hover:block text-white bg-indigo-950 dark:bg-white dark:text-indigo-950">
						{reaction.description}
					</div>
					<img
						className="w-full h-full rounded-full overflow-hidden"
						src={reaction.img}
						alt={reaction.description}
					/>
				</div>
			))}
		</div>
	);
}

export default ReactionBar;
