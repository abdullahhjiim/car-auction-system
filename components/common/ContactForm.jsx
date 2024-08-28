'use client';

import { authAxios } from '/app/(home)/axious-config';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const sitekey = process.env.NEXT_PUBLIC_SITE_KEY;

const ContactForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [token, setToken] = useState('');
  const recaptcha = useRef(null);
  const [phone, setPhone] = useState('+971');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [serverError, setServerError] = useState({});

  const [message, setMessage] = useState('');
  const [captChaError, setCaptchaError] = useState('');

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptchaError(null);
    setMessage(null);

    if (!token) {
      setCaptchaError('Captcha is Required');
    } else {
      authAxios
        .post(`/contact-us`, {
          name: userName,
          email: userEmail,
          phone: phone,
          message: userMessage,
        })
        .then((res) => {
          setMessage('Message sent successfully');
          setUserEmail('');
          setUserName('');
          setUserMessage('');
          setPhone('');
        })
        .catch((err) => {
          if (err?.response?.status == 422) {
            setServerError(err?.response?.data?.errors);
          } else if (err?.response?.status == 400) {
            setErrorMsg(err?.response?.data?.message);
          } else {
            setErrorMsg(err?.message);
          }
        });
    }
  };

  const onCaptchaChange = (captchaToken) => {
    if (captchaToken === null) {
      setToken(null);
    } else {
      setToken(captchaToken);
    }
  };

  const plusWithNumber = (text) => {
    const pattern = /^[\+\d]?(?:[\d\s()]*)$/;

    if (pattern.test(text)) {
      return text;
    } else {
      return text?.slice(0, -1);
    }
  };

  const handlePhone = (e, code) => {
    setPhone(e);
    setPhoneCode(code.dialCode);
  };

  return (
    <form className="font-secondary" ref={form} onSubmit={handleSubmit}>
      {/* input group */}
      {message && (
        <p className="text-green-600 text-center m-2 font-bold">{message}</p>
      )}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* name */}
        <div className="flex flex-col gap-y-3 w-full md:w-1/2">
          <label htmlFor="name" className="form-label !text-base">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="input-with-shadow"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {serverError && serverError?.name && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.name[0]}
            </p>
          )}
        </div>
        {/* email */}
        <div className="flex flex-col gap-y-3 w-full md:w-1/2">
          <label htmlFor="phone" className="">
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
          {serverError && serverError?.phone && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.phone[0]}
            </p>
          )}
          {serverError && serverError?.phone_code && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.phone_code[0]}
            </p>
          )}
          {phoneError && (
            <p className="text-red-300 font-bold text-sm">{phoneError}</p>
          )}
        </div>
      </div>
      {/* input group */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
        {/* subject */}
        <div className=" flex flex-col gap-y-3 w-full">
          <label htmlFor="email" className="form-label !text-base">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="Your Email"
            className="input-with-shadow"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {serverError && serverError?.email && (
            <p className="text-red-300 font-bold text-sm">
              {serverError?.email[0]}
            </p>
          )}
        </div>
      </div>
      {/* input group */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
        {/* message */}
        <div className=" flex flex-col gap-y-3 w-full">
          <label htmlFor="message" className="form-label !text-base">
            Message
          </label>
          <textarea
            type="message"
            placeholder="Your message"
            name="message"
            className="input-with-shadow"
            rows="3"
            required
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="flex md:flex-row  flex-col justify-center gap-4 md:justify-between  mt-4">
        <div className="">
          {/* message */}
          <div className="flex flex-col gap-y-3 w-full mt-4">
            <ReCAPTCHA
              size="normal"
              sitekey={sitekey}
              onChange={onCaptchaChange}
              ref={recaptcha}
            />
          </div>
        </div>

        <div className="flex justify-center md:justify-end ">
          <div>
            {captChaError && <p className="text-red-500">{captChaError}</p>}
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button
              className="bg-primary text-white font-base uppercase font-bold py-3 px-12 hover:translate-y-2 disabled:bg-opacity-50 duration-500 rounded mt-6"
              type="submit"
              disabled={!token}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
