import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isLogged }) => {
	const user = useSelector((state) => state.user.current);

	return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
