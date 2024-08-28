'use client';

import { authAxios } from '/app/(home)/axious-config';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

const StepTwo = ({ setActiveStep, email, otp, setOtp }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [serverError, setServerError] = useState({});

  const otpRequest = async () => {
    setServerError({});
    setErrorMsg(null);
    let url = '/auth/member-verify-otp';
    const formData = new FormData();
    formData.append('otp', otp);
    formData.append('email', email);

    try {
      const response = await authAxios.post(url, formData);
      if (response && response?.data?.success) {
        setActiveStep(3);
      }
    } catch (err) {
      if (err?.response?.status == 422) {
        setServerError(err?.response?.data?.errors);
      } else if (err?.response?.status == 400) {
        setErrorMsg(err?.response?.data?.message);
      } else {
        setErrorMsg(err?.message);
      }
    }
  };

  const handleSecondStep = (e) => {
    e.preventDefault();

    if (otp && otp.length == 4) {
      otpRequest();
    }
  };

  return (
    <form
      onSubmit={handleSecondStep}
      className="otp_checking_form text-center max-w-[555px] mx-auto bg-white bg-opacity-10 p-4 md:p-12 rounded-md backdrop-blur-md mt-6"
    >
      <h4 className="text-2xl font-bold mb-4 text-white">
        Please Check Your Email for OTP!
      </h4>
      {errorMsg && (
        <p className="text-red-300 font-bold text-sm mb-2">{errorMsg}</p>
      )}
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span> </span>}
        inputType="tel"
        containerStyle={{ display: 'unset' }}
        inputStyle={{ width: '3rem', height: '3.5rem' }}
        renderInput={(props) => <input {...props} className="otp-input" />}
      />
      {serverError && serverError?.otp && (
        <p className="text-red-300 font-bold text-sm mt-2">
          {serverError?.otp[0]}
        </p>
      )}
      {serverError && serverError?.email && (
        <p className="text-red-300 font-bold text-sm mt-2">
          {serverError?.email[0]}
        </p>
      )}
      <div className="mt-4">
        <button
          type="submit"
          className="bg-primary text-white font-bold w-full py-3 uppercase hover:bg-opacity-90 rounded-md duration-300 mt-2"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
