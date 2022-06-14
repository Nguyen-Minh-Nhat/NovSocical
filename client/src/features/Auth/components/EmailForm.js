import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../components/Button';
import InputField from '../../../components/InputFile';
import Spinner from '../../../components/Spinner';
const schema = yup.object().shape({
	email: yup.string().email().required(),
});

function EmailForm({ onSubmit, isCorrectOtp }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});
	return (
		<>
			<form
				className={`w-full h-full self-center flex flex-col space-y-12 bg-white 
  				`}
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<InputField
					label=" Email Address "
					type="email"
					name="email"
					register={register}
					error={errors.email}
				/>

				<div className="">
					<Button w={'w-full'} p={'p-4'} isValid={() => isValid} type="submit">
						Get OTP
					</Button>
				</div>
			</form>
		</>
	);
}

export default EmailForm;
