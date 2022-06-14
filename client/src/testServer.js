import axios from 'axios';
import { useState, useEffect } from 'react';
import StorageKeys from './constants/storageKeys';
import { Image } from 'cloudinary-react';

function TestServer() {
	const accessToken = localStorage.getItem(StorageKeys.accessToken);

	const [list, setList] = useState([]);
	// useEffect(() => {
	//   axios
	//     .get(`${process.env.REACT_APP_API_URL}/post/`, {
	//       headers: { accessToken },
	//     })
	//     .then((res) => {
	//       setList(res.data.listOfPost);
	//     });
	// }, []);

	let a = 'sfkkkkkkkkkkkkkkkavatar(1).svg'.slice(-13);
	let b = {};
	let c = 2;
	console.log(c);
	if (c > 0) {
		console.log(3);
	}
	if (c > 1) {
		console.log(4);
	}
	console.log();
	return (
		<div>
			{
				<Image
					className="h-auto w-full object-cover"
					cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
					publicId="veta/posts/uucnaca95wa43ecufmd1"
				/>
			}
		</div>
	);
}

export default TestServer;
