import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = ({ isLogged }) => {
	return isLogged ? <Navigate to="/" /> : <Outlet />;
};
export default PublicRoutes;
