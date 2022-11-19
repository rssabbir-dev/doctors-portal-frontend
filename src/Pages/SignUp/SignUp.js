import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
	const navigate = useNavigate();
	const { createUser, updateUserProfile } = useContext(AuthContext);
	const [showPass, setShowPass] = useState(false);
	const [createdUserEmail,setCreatedUserEmail] = useState('')
	const [token] = useToken(createdUserEmail)
	if (token) {
		navigate('/');
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleSignUp = (data) => {
		console.log(data);
		handleCreateUser(data.email, data.password, data.name, data.photoURL);
	};

	const handleCreateUser = (email, password, name, photoURL) => {
		createUser(email, password)
			.then((res) => {
				console.log(res.user);
				handleUpdateUserProfile(name, photoURL);
				savedUser(name, email);
			})
			.catch((err) => console.log(err));
	};
	const handleUpdateUserProfile = (name, photoURL) => {
		const profileData = { displayName: name, photoURL: photoURL };
		updateUserProfile(profileData)
			.then(() => {
				toast.success('Sign Up Success');
			})
			.catch((err) => console.log(err));
	};
	const savedUser = (name, email) => {
		const user = { name, email };
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				setCreatedUserEmail(email);
			});
	};
	
	return (
		<div className='h-[800px] flex justify-center items-center'>
			<div className='w-96 p-7'>
				<h2 className='text-xl text-center'>Sign Up</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Name</span>
						</label>
						<input
							{...register('name', {
								required: 'Name is required!',
							})}
							type='text'
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.name && (
							<p className='text-sm text-red-600'>
								{errors.name?.message}
							</p>
						)}
					</div>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Email</span>
						</label>
						<input
							{...register('email', {
								required: 'Email is required!',
							})}
							type='email'
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.email && (
							<p className='text-sm text-red-600'>
								{errors.email?.message}
							</p>
						)}
					</div>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Password</span>
						</label>
						<div className='relative'>
							<input
								type={showPass ? 'text' : 'password'}
								className='input input-bordered w-full max-w-xs'
								placeholder='Enter Password'
								{...register('password', {
									required: 'Password is required!',
									minLength: {
										value: 6,
										message:
											'Password Must be 6 Character longer',
									},
									pattern: {
										value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
										message: 'Password must be stronger!',
									},
								})}
							/>

							<span
								className='absolute inset-y-0 right-4 inline-flex items-center'
								onClick={() => setShowPass(!showPass)}
							>
								{!showPass && <FontAwesomeIcon icon={faEye} />}
								{showPass && (
									<FontAwesomeIcon icon={faEyeSlash} />
								)}
							</span>
						</div>
						{errors.password && (
							<p className='text-sm text-red-600'>
								{errors.password?.message}
							</p>
						)}
					</div>
					<input
						className='btn btn-accent w-full mt-4'
						value='Sign Up'
						type='submit'
					/>
				</form>
				<p>
					Already have an account{' '}
					<Link className='text-secondary' to='/login'>
						Please Login
					</Link>
				</p>
				<div className='divider'>OR</div>
				<button className='btn btn-outline w-full'>
					CONTINUE WITH GOOGLE
				</button>
			</div>
		</div>
	);
};

export default SignUp;
