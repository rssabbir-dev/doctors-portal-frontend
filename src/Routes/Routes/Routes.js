import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout';
import Main from '../../Layout/Main';
import Appointment from '../../Pages/Appointment/Appointment/Appointment';
import AllUsers from '../../Pages/Dashboard/AllUsers/AllUsers';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';
import MyAppointments from '../../Pages/Dashboard/MyAppoinments/MyAppointments';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/SignUp/SignUp';
import AdminRoute from '../AdminRoute/AdminRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main></Main>,
		children: [
			{
				path: '/',
				element: <Home></Home>,
			},
			{
				path: '/login',
				element: <Login></Login>,
			},
			{
				path: 'signup',
				element: <SignUp />,
			},
			{
				path: '/appointment',
				element: <Appointment></Appointment>,
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: '/dashboard',
				element: <MyAppointments />,
			},
			{
				path: '/dashboard/allusers',
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
