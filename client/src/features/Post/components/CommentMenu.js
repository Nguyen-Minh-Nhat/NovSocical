import React from 'react';
import Box from '../../../components/Box';

function CommentMenu({ setIdEditComment, commentId, onDelete }) {
	const handleClickDelete = () => {
		const answer = window.confirm('Are you sure you want to delete this post?');
		if (answer) {
			onDelete(commentId);
		}
	};
	return (
		<div className="w-40 h-20 absolute -bottom-4 translate-y-full">
			<Box width="w-full p-2 border border-solid border-indigo-850">
				<ul>
					<li
						className="rounded-lg px-2 hover:bg-blue-200 dark:hover:bg-indigo-850"
						onClick={() => setIdEditComment(commentId)}
					>
						Edit
					</li>
					<li
						onClick={handleClickDelete}
						className="rounded-lg px-2 hover:bg-blue-200 
            dark:hover:bg-indigo-850
            "
					>
						Delete
					</li>
				</ul>
			</Box>
		</div>
	);
}

export default CommentMenu;
