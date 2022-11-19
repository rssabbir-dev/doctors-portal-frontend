import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (loading) {
		return <LoadingSpinner />;
	}
	if (!user?.uid) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
	return children;
};

export default PrivateRoute;
