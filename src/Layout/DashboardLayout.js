import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);
	return (
		<>
			<Navbar>
				<label
					htmlFor='dashboard-drawer'
					tabIndex={0}
					className='btn btn-ghost lg:hidden'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h8m-8 6h16'
						/>
					</svg>
				</label>
			</Navbar>
			<div className='drawer drawer-mobile'>
				<input
					id='dashboard-drawer'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content'>
					<Outlet />
				</div>
				<div className='drawer-side'>
					<label
						htmlFor='dashboard-drawer'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
						<li>
							<Link to='/dashboard'>My Appointment</Link>
						</li>
						{isAdmin && (
							<>
								<li>
									<Link to='/dashboard/allusers'>
										All User
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
