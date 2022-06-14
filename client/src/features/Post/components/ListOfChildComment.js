import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import StorageKeys from '../../../constants/storageKeys';
import Comment from './Comment';
import CommentForm from './CommentForm';

function ListOfChildComment({ commentID, postID }) {
	const apiURL = '/childComment';
	const accessToken = localStorage.getItem(StorageKeys.accessToken);
	const [listOfChildComment, setListOfChildComment] = useState([]);
	const [formInitialValue, setFormInitialValue] = useState({
		post: postID,
		commentText: '',
		_id: commentID,
	});
	const handleDeleteComment = async (id) => {
		const url = `${apiURL}/delete/${id}`;
		try {
			const res = await axiosClient.delete(url, { headers: { accessToken } });
			if (res.data.success) {
				setListOfChildComment(
					listOfChildComment.filter((comment) => comment._id !== id)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleEditComment = async (data) => {
		const commentID = data.get('commentID');
		const url = `${apiURL}/update/${commentID}`;
		const res = await axiosClient.put(url, data, { headers: { accessToken } });
		if (res.data.success) {
			const newChildComment = res.data.newChildComment;
			const newListOfChildComment = listOfChildComment.map((comment) => {
				if (comment._id === commentID) return newChildComment;
				else return comment;
			});
			setListOfChildComment(newListOfChildComment);
		}
	};
	const handleClickReply = (id, userReply) => {
		console.log(userReply);
		setFormInitialValue({
			post: postID,
			commentText: userReply.name,
			_id: commentID,
		});
	};

	const handleCreateComment = async (data) => {
		const url = `${apiURL}/create`;
		try {
			const res = await axiosClient.post(url, data, {
				headers: { accessToken },
			});
			console.log(res);
			if (res.data.success) {
				console.log(res.data.newChildComment);
				setListOfChildComment([
					...listOfChildComment,
					res.data.newChildComment,
				]);
			} else console.log(res.message);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const url = `${apiURL}/${commentID}`;
		const source = axios.CancelToken.source();
		const getListOfChildComment = async () => {
			try {
				const res = await axiosClient.get(url, { headers: { accessToken } });
				if (res.data.success) {
					setListOfChildComment([...res.data.listOfChildComment]);
				} else console.log(1);
			} catch (error) {
				console.log(error);
			}
		};
		getListOfChildComment();
		return function cleanup() {
			source.cancel();
		};
	}, []);

	return (
		<div className="space-y-10">
			{listOfChildComment.map((comment, key) => {
				return (
					<div key={key} className="relative">
						<div className="absolute w-[3rem] -left-[2.75rem] -top-[3rem] h-[5rem] border-l-[0.2rem] border-b-[0.2rem] rounded-bl-3xl border-solid border-slate-200 dark:border-indigo-850 "></div>
						<Comment
							comment={comment}
							onClickReply={handleClickReply}
							onDeleteComment={handleDeleteComment}
							onEditComment={handleEditComment}
						/>
					</div>
				);
			})}
			<div className="relative">
				<div className="w-[2.75rem] h-full bg-white dark:bg-indigo-950 absolute -left-[2.75rem]">
					<div className="w-[90%] h-1/2  border-l-[0.2rem] border-b-[0.2rem] rounded-bl-3xl border-solid border-slate-200 dark:border-indigo-850  "></div>
				</div>
				<CommentForm
					onSubmit={handleCreateComment}
					type={`creatNewComment${commentID}`}
					initialValue={formInitialValue}
				/>
			</div>
		</div>
	);
}

export default ListOfChildComment;
