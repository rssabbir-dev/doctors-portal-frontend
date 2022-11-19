import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const MyAppointments = () => {
	const {user} = useContext(AuthContext)
	// const [bookings,setBookings]= useState([])
	// useEffect(() => {
	// 	fetch(`${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`)
	// 	.then(res => res.json())
	// 	.then(data => setBookings(data))
		
	// },[user?.email])
	const url = `${process.env.REACT_APP_API_URL}/bookings?email=${user?.email}`;;
	const { data: bookings = [] } = useQuery({
		queryKey: ['bookings', user?.email],
		queryFn: async () => {
			const res = await fetch(url, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});
			const data = await res.json()
			return data;

		}
	})
	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>No.</th>
						<th>Name</th>
						<th>Treatment</th>
						<th>Date</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking, index) => (
						<tr key={booking._id}>
							<th>{index + 1}</th>
							<td>{booking.patient}</td>
							<td>{booking.treatment}</td>
							<td>{booking.appointmentDate}</td>
							<td>{booking.slot}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MyAppointments;
