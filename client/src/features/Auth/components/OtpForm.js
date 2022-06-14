import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import Box from '../../../components/Box';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../components/Button';
import InputField from '../../../components/InputFile';

const schema = yup.object().shape({
	otp: yup
		.string()
		.required()
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(4, 'Must be exactly 4 digits')
		.max(4, 'Must be exactly 4 digits'),
});

function OtpForm({ onSubmit, resendOtp }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box width="w-[30rem]">
				<div className=" flex flex-col gap-6">
					<div className="flex flex-col">
						<div className="flex justify-end cursor-pointer ">
							<i className="fas fa-times-circle text-4xl close-position"></i>
						</div>
						<span className="text-xl text-center block mt-4 ">
							You will get OTP code in your Email
						</span>
						<InputField
							label=""
							type="text"
							name="otp"
							register={register}
							error={errors.otp}
						/>
					</div>

					<div>
						<Button w={'w-full'} p={'p-4'} isValid={isValid} type="submit">
							Verify
						</Button>

						<span className="text-xl text-center block my-8 ">
							Did't receive the OTP code?&nbsp;
							<span
								className="text-indigo-600 cursor-pointer "
								onClick={resendOtp}
							>
								Resend again
							</span>
						</span>
					</div>
				</div>
			</Box>
		</form>
	);
}

export default OtpForm;
