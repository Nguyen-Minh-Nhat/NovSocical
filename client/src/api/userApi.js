import axiosClient from './axiosClient';
import StorageKeys from '../constants/storageKeys';

const userApi = {
	register(data) {
		const url = 'auth/register';
		return axiosClient.post(url, data);
	},

	login(data) {
		const url = 'auth/login';
		return axiosClient.post(url, data);
	},
	async getUser() {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);

		const url = '/auth';
		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},

	async getUserById(id) {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const url = `/user/profile/${id}`;

		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},
	async getAllFollowingUsers(id) {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const url = `/user/following/${id}`;

		return axiosClient.get(url, {
			headers: { accessToken },
		});
	},

	async updateUser(data) {
		const accessToken = localStorage.getItem(StorageKeys.accessToken);
		const url = `user/update`;
		return axiosClient.patch(url, data, {
			headers: { accessToken },
		});
	},
};

export default userApi;
