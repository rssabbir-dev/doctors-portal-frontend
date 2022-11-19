import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
	const [treatment, setTreatment] = useState(null);
	const date = format(selectedDate,'PP')

	const { data: appointmentOptions, isLoading,refetch } = useQuery({
		queryKey: ['appointmentOptions',date],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/appointmentOptions?date=${date}`
			);
			const data = await res.json()
			return data;
		},
	});
	return (
		<>
			{isLoading && <h1 className='text-5xl'>Loading...</h1>}
		{!isLoading && <section className='my-16'>
			<p className='text-center text-secondary font-bold'>
				Available Appointments on {format(selectedDate, 'PP')}
			</p>
			<div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
				{appointmentOptions.map((option) => (
					<AppointmentOption
						key={option._id}
						appointmentOption={option}
						setTreatment={setTreatment}
					></AppointmentOption>
				))}
			</div>
			{treatment && (
				<BookingModal
					selectedDate={selectedDate}
					treatment={treatment}
						setTreatment={setTreatment}
						refetch={refetch}
				></BookingModal>
			)}
		</section>}
		</>
	);
};

export default AvailableAppointments;
