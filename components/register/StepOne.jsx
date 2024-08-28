"use client";

import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import HtmlIframe from "../extra/HtmlFrame";
import { authAxios } from "/app/(home)/axious-config";

const StepOne = ({ setActiveStep, email, setEmail }) => {
  const [type, setType] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [trn, setTrn] = useState("");
  const [phone, setPhone] = useState("+971");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [serverError, setServerError] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [tcModal, setTcModal] = useState(false);

  const tcModalClose = () => {
    setTcModal(false);
  };

  const resgister = async () => {
    setServerError({});
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("company_name", companyName);
    formData.append("trn", trn);
    formData.append(
      "primary_phone",
      phone.startsWith(phoneCode) ? phone.slice(phoneCode.length) : phoneCode
    );
    formData.append("primary_phone_code", phoneCode);
    try {
      const response = await authAxios.post(
        "/auth/member-registration",
        formData
      );
      if (response && response?.data?.success) {
        setActiveStep(2);
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

  //  step one submit
  const handleFirstStep = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!phone) {
      setPhoneError("Input Phone Number");
      return;
    }
    if (firstName && lastName && email && phoneCode && phone) {
      resgister();
    } else {
      setErrorMsg("Please input all required filed properly");
    }
  };

  const handlePhone = (e, code) => {
    setPhone(e);
    setPhoneCode(code.dialCode);
  };

  const clearAllFrom = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setTrn("");
    setPhoneCode(null);
    setPhoneError("");
    setErrorMsg(null);
    setServerError({});
    setEmail("");
  };

  const handleAgree = (e) => {
    const { checked } = e.target;
    if (checked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div className="text-start max-w-[520px] mx-auto bg-white bg-opacity-10 rounded-md backdrop-blur-md mt-6 ">
      <form onSubmit={handleFirstStep} className=" p-4 md:p-8">
        {errorMsg && (
          <p className="text-red-300 font-bold text-sm">{errorMsg}</p>
        )}

        {/* Account Type */}
        <div className="flex justify-between text-white">
          <div className="font-semibold">
            Account Type<span className="text-[#b98989] font-bold">*</span>
          </div>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                type="radio"
                value="1"
                checked={type == 1}
                name="inline-radio-group"
                onChange={() => {
                  setType(1);
                  setCompanyName("");
                }}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary   focus:ring-2"
              />
              <label
                htmlFor="inline-radio"
                className="ms-2 text-sm font-medium"
              >
                Individual
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                type="radio"
                value="2"
                checked={type == 2}
                onChange={() => setType(2)}
                name="inline-radio-group"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="inline-2-radio"
                className="ms-2 text-sm font-medium"
              >
                Business
              </label>
            </div>
          </div>
        </div>

        {/* Company Name */}
        {type === 2 && (
          <div className="my-4">
            <label htmlFor="companyName" className="text-white">
              Company Name<span className="text-[#b98989] font-bold">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="input-with-shadow w-full "
              value={companyName}
              onChange={(e) => {
                if (e.target.value.match(/^[A-Za-z0-9-_#\s]*$/)) {
                  setCompanyName(e.target.value);
                }
              }}
            />
            {serverError && serverError?.company_name && (
              <p className="text-red-300 font-bold text-sm">
                {serverError?.company_name[0]}
              </p>
            )}
          </div>
        )}

        {/* trn start*/}
        {type === 2 && (
          <div className="my-4">
            <label htmlFor="trn" className="text-white">
              TRN<span className="text-[#b98989] font-bold">*</span>
            </label>
            <input
              type="text"
              name="trn"
              placeholder="TRN"
              className="input-with-shadow w-full"
              value={trn}
              onChange={(e) => {
                setTrn(e.target.value);
              }}
            />
            {serverError && serverError?.trn && (
              <p className="text-red-300 font-bold text-sm">
                {serverError?.trn[0]}
              </p>
            )}
          </div>
        )}

        {/* trn end */}

        {/* first name */}
        <div className="my-4">
          <label htmlFor="firstName" className="text-white">
            First Name<span className="text-[#b98989] font-bold">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            placeholder="First Name"
            className="input-with-shadow w-full "
            value={firstName}
            onChange={(e) => {
              if (e.target.value.match(/^[A-Za-z\s]*$/)) {
                setFirstName(e.target.value);
              }
            }}
          />
          {serverError && serverError?.first_name && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.first_name[0]}
            </p>
          )}
        </div>
        {/* last name */}
        <div className="my-4">
          <label htmlFor="lastName" className="text-white">
            Last Name<span className="text-[#b98989] font-bold">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Last Name"
            className="input-with-shadow w-full "
            value={lastName}
            onChange={(e) => {
              if (e.target.value.match(/^[A-Za-z\s]*$/)) {
                setLastName(e.target.value);
              }
            }}
          />
          {serverError && serverError?.last_name && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.last_name[0]}
            </p>
          )}
        </div>
        {/* email */}
        <div className="my-4">
          <label htmlFor="email" className="text-white">
            Your Email<span className="text-[#b98989] font-bold">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter Email"
            className="input-with-shadow w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {serverError && serverError?.email && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.email[0]}
            </p>
          )}
        </div>
        {/* phone */}
        <div className="my-4">
          <label htmlFor="phone" className="text-white ">
            Phone Number<span className="text-[#b98989] font-bold">*</span>
          </label>
          <PhoneInput
            required
            defaultCountry="ae"
            placeholder="Enter Phone Number"
            enableSearch
            value={phone}
            dialCode={phoneCode}
            onChange={(e, dialCode) => handlePhone(e, dialCode)}
          />
          {serverError && serverError?.primary_phone && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.primary_phone[0]}
            </p>
          )}
          {serverError && serverError?.primary_phone_code && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.primary_phone_code[0]}
            </p>
          )}
          {phoneError && (
            <p className="text-red-300 font-bold text-sm">{phoneError}</p>
          )}
        </div>

        <div className="flex justify-content-start items-start gap-1.5">
          <input type="checkbox" className="" onChange={handleAgree} />
          <p className="text-gray-300 text-xs">
            By clicking this box, I agree that I am at least 18 years age and
            that I have read and agreed to the Gulf Cars Auction&apos;s
            <span>
              <Link
                href=""
                onClick={() => setTcModal(true)}
                className="text-red-500 font-semibold m-1"
              >
                Terms & condition
              </Link>
            </span>
            and
            <span>
              <Link
                href="/privacy-policy"
                className="text-red-500 font-semibold m-1"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </span>
          </p>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isDisabled}
            className="disabled:bg-opacity-80 disabled:text-opacity-60 bg-primary text-white font-bold w-full py-3 uppercase hover:bg-opacity-90 rounded-md duration-300 mt-2"
          >
            Register
          </button>
        </div>
      </form>
      <Dialog open={tcModal} size="md" onClose={tcModalClose}>
        <DialogHeader>
          <div className="w-full flex justify-between rounded-md items-center bg-primary text-white p-2">
            <h4>Terms & Condition</h4>
            <FaTimes
              className="cursor-pointer hover:rotate-90 hover:scale-125 duration-300"
              onClick={tcModalClose}
            />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="max-h-[70vh] p-2">
            <HtmlIframe
              htmlContent={null}
              iframeUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/page-frame/TERMS_AND_CONDITIONS`}
            />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default StepOne;
