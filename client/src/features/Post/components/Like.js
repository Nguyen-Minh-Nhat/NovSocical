import React from 'react';
import { useDispatch } from 'react-redux';
import postApi from '../../../api/postApi';
import { updatePost } from '../postSlice';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Like({ isLiked, postID, socket }) {
	const dispatch = useDispatch();

	const handleLikePost = async () => {
		try {
			const res = await postApi.setLove(postID);

			if (res.data.success) {
				await socket.emit('likePost', res.data.lovedPost);
				const action = updatePost(res.data.lovedPost);
				dispatch(action);
			} else console.log(res.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="relative flex-1">
				<div
					className="cursor-pointer flex-1 text-center rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-indigo-1050 relative "
					onClick={handleLikePost}
				>
					{isLiked ? (
						<AiFillHeart className="inline text-4xl mr-2 text-red-600" />
					) : (
						<AiOutlineHeart className="inline text-4xl mr-2  " />
					)}
					Like
				</div>
			</div>
		</>
	);
}

export default Like;
