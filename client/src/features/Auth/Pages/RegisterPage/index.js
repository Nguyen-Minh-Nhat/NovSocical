import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axiosClient from "../../../../api/axiosClient";
import { alerts } from "../../../../components/Alert/alertSlice";
import Modal from "../../../../components/Modal";
import { setModal } from "../../../../components/Modal/modalSlice";
import Spinner from "../../../../components/Spinner";
import EmailForm from "../../components/EmailForm";
import OtpForm from "../../components/OtpForm";
import RegisterForm from "../../components/RegisterForm";
import { register } from "../../userSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isOpenOtpForm, setIsOpenOtpForm] = useState(false);
  const [isCorrectOtp, seIsCorrectOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (data) => {
    setIsLoading(true);
    const url = "/auth/otp";
    try {
      const res = await axiosClient.post(url, data);
      setIsLoading(false);

      if (res.data.success) {
        setEmail(data.email);
        const modalAction = setModal({
          isOpen: true,
          children: (
            <OtpForm onSubmit={handleSubmitOtp} resendOtp={resendOtp} />
          ),
        });
        dispatch(modalAction);
      } else {
        const alertAction = alerts({
          type: "failure",
          message: "Email is already exists",
        });
        dispatch(alertAction);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resendOtp = () => {
    handleSendOtp({ email: email });
  };
  const handleSubmitOtp = async (data) => {
    const url = "/auth/confirmOtp";
    try {
      const res = await axiosClient.post(url, data);
      if (res.data.success) {
        setIsOpenOtpForm(false);
        seIsCorrectOtp(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.status.message);
    }
  };

  const handleRegister = async (data) => {
    data.append("email", email);
    try {
      const action = register(data);
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="md:max-w-[50rem] w-full h-screen flex justify-center  flex-col pt-12 lg:px-28 md:items-start items-center px-4 space-y-12 ">
      <div className="p-10 bg-white rounded-lg min-w-[36rem] space-y-8 relative ">
        {isLoading && (
          <div className="absolute left-0 top-0 bottom-0 right-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
            <Spinner custom="w-12 h-12 " />
          </div>
        )}
        <div>
          <h1 className="my-2 text-6xl font-bold text-slate-700">Register</h1>
        </div>

        <div className="w-full flex justify-center items-center">
          {" "}
          {isCorrectOtp && (
            <RegisterForm onSubmit={handleRegister} email={email} />
          )}
          {!isCorrectOtp && (
            <EmailForm onSubmit={handleSendOtp} isCorrectOtp={isCorrectOtp} />
          )}
          {isOpenOtpForm && <Modal setIsOpen={setIsOpenOtpForm}></Modal>}
        </div>

        <div className="pb-4 border-t text-center md:text-left w-full border-solid border-gray-300">
          <p className="mt-4 text-2xl text-gray-600">
            Already an account?
            <Link
              to="/login"
              className="font-medium ml-2 text-2xl text-indigo-600 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
