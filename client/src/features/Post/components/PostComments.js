import React, { useEffect, useState } from 'react';
import commentApi from '../../../api/commentApi';
import Comment from './Comment';
import CommentForm from './CommentForm';

function PostComments({ postId }) {
	const [replyOf, setReplyOf] = useState('');
	const [replyUser, setReplyUser] = useState('');
	const [listOfComments, setListOfComments] = useState([]);

	const handleClickReply = (replyOf, replyUser) => {
		setReplyOf(replyOf);
		setReplyUser(replyUser);
	};

	const handleCreateComment = async (data) => {
		try {
			const res = await commentApi.create(data);
			if (res.data.success) {
				setListOfComments([...listOfComments, res.data.newCmt]);
			}
		} catch (error) {}
	};

	const handleDeleteComment = async (commentId) => {
		console.log(commentId);
		try {
			const res = await commentApi.deleteCommentById(commentId);
			if (res.data.success) {
				setListOfComments(
					listOfComments.filter((comment) => comment._id !== commentId)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditComment = async (data) => {
		try {
			const res = await commentApi.updateCommentById(
				data.get('commentID'),
				data
			);
			if (res.data.success) {
				const newListOfComments = listOfComments.map((comment) => {
					if (comment._id === data.get('commentID'))
						return res.data.updatedComment;
					return comment;
				});
				setListOfComments(newListOfComments);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getListOfComments = async () => {
			try {
				const res = await commentApi.getPostComments(postId);
				if (res.data.success) {
					setListOfComments([...res.data.listOfComments]);
				} else console.log(1);
			} catch (error) {
				console.log(error);
			}
		};
		getListOfComments();
	}, []);

	return (
		<div className="space-y-10">
			{listOfComments.map((comment, key) => {
				return (
					<div key={key}>
						<Comment
							comment={comment}
							onClickReply={handleClickReply}
							onDeleteComment={handleDeleteComment}
							onEditComment={handleEditComment}
						/>
						<div className="ml-20">
							{comment.commentID === replyOf && (
								<CommentForm
									onSubmit={handleCreateComment}
									initialValue={{
										replyOf: replyOf,
										postID: postId,
										commentText: replyUser,
									}}
									type="createNewReplyComment"
								/>
							)}
						</div>
					</div>
				);
			})}
			<div className="mt-4">
				<CommentForm
					onSubmit={handleCreateComment}
					type={`creatNewComment${postId}`}
					initialValue={{
						postID: postId,
						commentText: '',
					}}
				/>
			</div>
		</div>
	);
}

export default PostComments;

// const rootComments = comments.filter((comment) => comment.replyOf === '');
// const getReplyComments = (rootCommentID) => {
// 	return comments.filter((comment) => comment.replyOf === rootCommentID);
// };
