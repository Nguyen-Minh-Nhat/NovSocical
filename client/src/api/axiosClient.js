import axios from 'axios';
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
		'content-type': 'application/json',
	},
});

export default axiosClient;
