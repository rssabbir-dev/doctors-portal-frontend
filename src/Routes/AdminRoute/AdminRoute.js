import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);
	const location = useLocation();
	if (loading || isAdminLoading) {
		return <LoadingSpinner />;
	}
	if (!isAdmin) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
	return children;
};

export default AdminRoute;
