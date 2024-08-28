"use client";

import { authAxios } from "/app/(home)/axious-config";
import { setUser } from "/app/(home)/features";
import { makeAuthData } from "/app/(home)/utils/setTokent";
import { useEffect, useState } from "react";
import { FaCheck, FaInfo, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Selector from "./Selector";

const StepThree = ({ setActiveStep, email, otp }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [country, setCountry] = useState(null);
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [serverError, setServerError] = useState({});

  const passwordSet = async () => {
    setServerError({});
    setErrorMsg(null);
    let url = "/auth/member-create-password";
    const formData = new FormData();

    formData.append("country_id", country);
    formData.append("address", address);
    formData.append("otp", otp);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", conPassword);

    try {
      const response = await authAxios.post(url, formData);

      makeAuthData(response?.data);
      dispatch(setUser(response?.data));
      setActiveStep(4);
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

  const handleThirdStep = (e) => {
    e.preventDefault();

    if (password && conPassword && country) {
      if (password === conPassword) {
        passwordSet();
      } else {
        setErrorMsg("Password Does not Match!");
      }
    } else {
      setErrorMsg("Please Fill All The Fields");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (infoVisible && e.target.closest(".info-box") === null) {
        setInfoVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [infoVisible]);

  return (
    <form
      onSubmit={handleThirdStep}
      className="register_step_three max-w-[555px] mx-auto bg-white bg-opacity-10 p-4 md:p-12 rounded-md backdrop-blur-md mt-6"
    >
      <h4 className="text-2xl font-bold mb-6 text-white text-center">
        Please Fill Up the below Fields!
      </h4>

      {errorMsg && <p className="text-red-300 font-bold text-sm">{errorMsg}</p>}

      {/* password */}
      <div className="text-start">
        <div className="flex items-center gap-x-2">
          <label htmlFor="password">
            Your Password <span className="text-primary">*</span>
          </label>
          <div className="relative z-[111]">
            <div
              className="cursor-pointer bg-white w-4 h-4 rounded-full flex justify-center items-center hover:text-white hover:bg-primary duration-500"
              onClick={() => setInfoVisible((prev) => !prev)}
            >
              <FaInfo size={10} />
            </div>
            {infoVisible && (
              <div className="absolute top-[180%] left-1/2 -translate-x-1/2 p-4 rounded-md overflow-hidden bg-white w-[320px] z-[111]">
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-with-shadow w-full !py-3.5 !pr-12"
          />

          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </div>
        </div>
        {serverError && serverError?.password && (
          <p className="text-red-300 font-bold text-sm">{serverError?.password[0]}</p>
        )}
      </div>

      {/* confirm password */}
      <div className="text-start mt-2">
        <label htmlFor="conPass">
          Confirm Password <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <input
            required
            name="conPass"
            placeholder="Confirm Your Password"
            type={showConPassword ? "text" : "password"}
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="input-with-shadow w-full !py-3.5 !pr-12"
          />
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary"
            onClick={() => setShowConPassword((prev) => !prev)}
          >
            {showConPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </div>
        </div>
        {serverError && serverError?.password_confirmation && (
          <p className="text-red-300 font-bold text-sm">{serverError?.password_confirmation[0]}</p>
        )}
      </div>

      {/* choose country */}
      <div className="text-start !mt-2">
        <label htmlFor="country">
          Select Country <span className="text-primary">*</span>
        </label>
        <Selector placeholder="Country" url={"/search/active-countries"} setValue={setCountry} />
        {serverError && serverError?.country_id && (
          <p className="text-red-300 font-bold text-sm">{serverError?.country_id[0]}</p>
        )}
      </div>

      {/* address start */}
      <div className="text-start !mt-2">
        <label htmlFor="address">
          Address <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="input-with-shadow w-full "
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        {serverError && serverError?.address && (
          <p className="text-red-300 font-bold text-sm">{serverError?.address[0]}</p>
        )}
      </div>
      {/* address end */}

      <div className="mt-4">
        <button
          type="submit"
          className="bg-primary text-white font-bold w-full py-3 uppercase hover:bg-opacity-90 rounded-md duration-300 mt-2"
        >
          Create Password
        </button>
      </div>
    </form>
  );
};

export default StepThree;
