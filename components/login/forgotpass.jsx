import { authAxios } from '/app/(home)/axious-config';
import logo from '@/public/logo.png';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ForgotPass = ({ modal, setModalClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [errorMismatch, setErrorMismatch] = useState('');
  const [approveMessage, setApproveMessage] = useState('');

  const clearAll = () => {
    setEmail('');
    setErrorMismatch('');
    setApproveMessage('');
  };

  const _hanleSubmit = (e) => {
    e.preventDefault();
    setErrorMismatch('');
    setApproveMessage('');
    if (email) {
      let formData = new FormData();
      formData.append('email', email);

      authAxios
        .post(`/auth/forget-password`, formData)
        .then((res) => {
          setLoading(false);
          setApproveMessage(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErrorMismatch(err?.response?.message ?? 'Something went wrong');
        });
    }
  };

  const closeFunction = () => {
    clearAll();
    setModalClose();
  };

  return (
    <Dialog open={modal ?? false} size="xs" handler={closeFunction}>
      <DialogHeader>
        <div className="flex flex-row justify-between w-full">
          <h1></h1>
          <button
            onClick={closeFunction}
            className="bg-primary text-white p-2 rounded-md text-sm hover:opacity-60 duration-200"
          >
            X
          </button>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="flex min-h-full flex-col justify-center py-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center items-center">
              <Image
                src={logo}
                alt="logo"
                className="max-w-[120px] h-[80px] object-cover"
              />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Your Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorMismatch && (
              <p className="text-red-500 m-2 text-sm font-semibold ">
                {errorMismatch}
              </p>
            )}
            {approveMessage && (
              <p className="text-green-500 m-2 text-sm font-semibold ">
                {approveMessage}
              </p>
            )}
            <form className="space-y-6" onSubmit={_hanleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline hover:opacity-70 duration-200"
                >
                  {loading ? 'Loading...' : 'Reset Password'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Dont&apos;t have a account?
              <Link
                href="/registration"
                className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default ForgotPass;
