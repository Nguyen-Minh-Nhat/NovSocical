import React, { useEffect } from 'react';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Auth({ type }) {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/');
	}, [isLoggedIn]);

	return (
		<div className="w-screen flex flex-1 justify-center items-center bg-slate-800 relative ">
			<div className="w-screen h-screen relative overflow-hidden">
				<div className="w-[80rem] h-[80rem] self-start left-0 top-1/2 -translate-y-1/2 absolute animate-scale">
					<div className="w-[100%] h-[100%] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-700"></div>
					<div className="w-[80%] h-[80%] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-400"></div>
					<div className="w-[60%] h-[60%] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-300"></div>
					<div className="w-[40%] h-[40%] rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-200"></div>
				</div>
			</div>
			<div className="w-full h-full absolute top-0 left-0 sm:flex justify-center">
				<div className="md:max-w-[50rem] max-w-full w-full h-screen flex justify-center items-center">
					<span className="text-[8.8rem] tracking-widest drop-shadow-2xl text-blue-400 font-semibold">
						Nov<span className="text-indigo-600">S</span>
					</span>
				</div>
				{type === 'login' ? <LoginPage /> : <RegisterPage />}
			</div>
		</div>
	);
}

export default Auth;
