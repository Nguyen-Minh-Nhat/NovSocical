import StorageKeys from '../constants/storageKeys';
import axiosClient from './axiosClient';
const accessToken = localStorage.getItem(StorageKeys.accessToken);

const commentApi = {
	create(data) {
		const url = '/comment/create';
		return axiosClient.post(url, data, {
			headers: { accessToken },
		});
	},
	async getAll() {
		const url = '/comment';
		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},
	async getPostComments(postId) {
		const url = `/comment/${postId}`;
		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},
	async getCommentById(id) {
		const url = `/comment/${id}`;

		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},

	async updateCommentById(id, data) {
		const url = `/comment/update/${id}`;
		return axiosClient.put(url, data, {
			headers: { accessToken },
		});
	},

	async deleteCommentById(id) {
		const url = `/comment/delete/${id}`;
		return axiosClient.delete(url, {
			headers: { accessToken },
		});
	},
};

export default commentApi;
