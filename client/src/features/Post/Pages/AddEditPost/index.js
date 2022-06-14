import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../../api/postApi';
import { alerts } from '../../../../components/Alert/alertSlice';
import { loading } from '../../../../components/Loading/loadingSlice';
import { setModal } from '../../../../components/Modal/modalSlice';
import PostForm from '../../components/PostForm';
import { addNewPost, updatePost } from '../../postSlice';

function AddEditPost({ initialData }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.current);
	let modalAction = setModal({ isOpen: false, children: null });
	const handleCreateNewPost = async (data) => {
		data.append('email', user.email);

		//set loading
		let loadingAction = loading({ loading: true });
		dispatch(loadingAction);

		try {
			const res = await postApi.create(data);
			if (res.data.success) {
				loadingAction = loading({ loading: false });
				const alertAction = alerts({
					type: 'success',
					message: 'your post has been created',
				});
				dispatch(loadingAction);
				dispatch(alertAction);
				dispatch(modalAction);

				const newPost = res.data.newPost;
				const action = addNewPost(newPost);
				dispatch(action);
			} else {
				loadingAction = loading({ loading: false });
				const alertAction = alerts({
					type: ' failure',
					message: 'something went wrong',
				});
				dispatch(alertAction);
				dispatch(modalAction);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditPost = async (data) => {
		let loadingAction = loading({ loading: true });
		dispatch(loadingAction);
		const isImageChange = !(
			data.get('postImage') === initialData.initialValue.postImage
		);
		if (
			!isImageChange &&
			data.get('postText') === initialData.initialValue.postText
		) {
			loadingAction = loading({ loading: false });
			dispatch(loadingAction);
			dispatch(modalAction);
		} else {
			try {
				data.append('email', user.email);
				data.append('isImageChange', isImageChange);
				const res = await postApi.updatePostById(
					initialData.initialValue._id,
					data
				);
				if (res.data.success) {
					const action = updatePost(res.data.updatedPost);
					dispatch(action);
					loadingAction = loading({ loading: false });
					dispatch(loadingAction);
					dispatch(modalAction);
				} else {
					loadingAction = loading({ loading: false });
					const alertAction = alerts({
						type: ' failure',
						message: 'something went wrong',
					});
					dispatch(alertAction);
					dispatch(modalAction);
				}
			} catch (error) {
				alert(error);
			}
		}
	};

	return (
		<PostForm
			onSubmit={
				initialData.type === 'create' ? handleCreateNewPost : handleEditPost
			}
			initialData={initialData.initialValue}
			type={initialData.type}
		/>
	);
}

export default AddEditPost;
