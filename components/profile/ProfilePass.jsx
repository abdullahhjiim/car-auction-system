'use client';

import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useState } from 'react';
import { FaCheck, FaInfo, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePass = ({ token }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [serverError, setServerError] = useState({});

  const clearForm = () => {
    setOldPassword('');
    setPassword('');
    setConPassword('');
  };

  const handlePassChange = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setServerError('');

    if (oldPassword && password && conPassword) {
      if (password === conPassword) {
        setSubmitLoading(true);
        authAxios
          .post(
            '/users/change-password',
            {
              old_password: oldPassword,
              password: password,
              password_confirmation: conPassword,
            },
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          .then((res) => {
            clearForm();
            setSubmitLoading(false);
            toast(res?.data?.message ?? 'Successfully submit request', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((err) => {
            setSubmitLoading(false);
            if (err?.response?.status == 422) {
              setServerError(err?.response?.data?.errors);
            } else if (err?.response?.status == 400) {
              setErrorMsg(err?.response?.data?.message);
            } else {
              setErrorMsg(err?.message);
            }
          });
      } else {
        setErrorMsg('Password Does not Match!');
      }
    } else {
      setErrorMsg('Please fill all the required field');
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (infoVisible && e.target.closest('.info-box') === null) {
        setInfoVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [infoVisible]);

  return (
    <form onSubmit={handlePassChange}>
      {/* password */}
      {errorMsg && <p className="text-primary font-bold mb-2">{errorMsg}</p>}
      <div className="text-start">
        <div className="flex items-center gap-x-2">
          <label htmlFor="password" className="font-semibold">
            Old Password <span className="text-primary">*</span>
          </label>
        </div>
        <div className="relative">
          <input
            required
            name="password"
            placeholder="Enter Old Password"
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input-with-shadow w-full my-2 !py-3 !pr-12"
          />

          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
            onClick={() => setShowOldPassword((prev) => !prev)}
          >
            {showOldPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {serverError && serverError?.old_password && (
          <p className="text-red-300 font-bold text-sm">
            {serverError?.old_password[0]}
          </p>
        )}
      </div>
      <div className="text-start mt-3">
        <div className="flex items-center gap-x-2">
          <label htmlFor="password" className="font-semibold">
            New Password <span className="text-primary">*</span>
          </label>
          <div className="relative z-[1]">
            <div
              className="cursor-pointer bg-gray-300 w-4 h-4 rounded-full flex justify-center items-center hover:text-white hover:bg-primary duration-500"
              onClick={() => setInfoVisible((prev) => !prev)}
            >
              <FaInfo size={10} />
            </div>
            {infoVisible && (
              <div className="absolute top-[180%] left-1/2 -translate-x-1/2 p-4 rounded-md overflow-hidden bg-gray-100 w-[320px] z-[111]">
                <ul className="text-sm gap-y-2.5 flex flex-col">
                  <li className="flex items-center gap-x-1">
                    <FaCheck size={12} />
                    Password must contain an Uppercase letter
                  </li>
                  <li className="flex items-center gap-x-1">
                    <FaCheck size={12} />
                    Password must contain a lowercase letter
                  </li>
                  <li className="flex items-center gap-x-1">
                    <FaCheck size={12} />
                    Password must contain a special character
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            required
            name="password"
            placeholder="Enter Your Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-with-shadow w-full my-2 !py-3 !pr-12"
          />

          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {serverError && serverError?.password && (
          <p className="text-red-300 font-bold text-sm">
            {serverError?.password[0]}
          </p>
        )}
      </div>

      {/* confirm password */}
      <div className="text-start mt-3 mb-4">
        <label htmlFor="conPass" className="font-semibold">
          Confirm New Password <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            required
            name="conPass"
            placeholder="Confirm Your Password"
            type={showConPassword ? 'text' : 'password'}
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="input-with-shadow w-full my-2 !py-3 !pr-12"
          />
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
            onClick={() => setShowConPassword((prev) => !prev)}
          >
            {showConPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </div>
        </div>
        {serverError && serverError?.password_confirmation && (
          <p className="text-red-300 font-bold text-sm">
            {serverError?.password_confirmation[0]}
          </p>
        )}
      </div>

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          disabled={submitLoading}
          className="bg-primary text-sm text-white font-bold hover:bg-opacity-90 disabled:bg-opacity-90 py-3 px-3 rounded-md duration-300"
        >
          {submitLoading ? 'Loading...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
};

export default ProfilePass;
