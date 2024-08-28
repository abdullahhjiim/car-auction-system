'use client';
import { loginUser } from '/app/(home)/features';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPass from './forgotpass';

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModalClose] = useState(false);
  const [errorMismatch, setErrorMismatch] = useState('');
  const { isAuthenticated, user, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setErrorMismatch('');
    const _back = searchParams.get('back');

    if (isAuthenticated) {
      if (user.role != 6 && user.role != 7) {
        // redirect to admin
        window.location.replace(user?.admin_login_url);
      } else if (
        (user.role == 7 || user.role == 6) &&
        user?.required_documents == true
      ) {
        router.push('/registration?step=4');
      } else if (user.role == 7 && user?.required_documents == false) {
        window.location.replace(user?.admin_login_url);
      } else {
        if (_back) {
          router.back();
        } else {
          router.push('/admin/dashboard');
        }
      }
    }

    if (error) {
      if (error.status === 400) {
        setErrorMismatch(error.data?.message);
      } else if (error.status === 422) {
        let result = {};

        let _errors = error.data;
        Object.keys(_errors).map((key) => {
          result[key] = _errors[key][0];
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, error, loading]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const _hanleSubmit = (e) => {
    e.preventDefault();
    setErrorMismatch('');
    if (email && password) {
      dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
    }
  };

  return (
    <>
      <div className="w-full md:w-[56%] bg-primary bg-opacity-5 p-4 md:p-12 lg:p-20 text-center flex justify-center items-center">
        <div className="w-full">
          <form
            onSubmit={_hanleSubmit}
            className="text-start max-w-[555px] mx-auto bg-black bg-opacity-5 p-4 md:p-12 rounded-md backdrop-blur-md mt-6"
          >
            <p className="opacity-75 font-semibold font-sl">
              Sign in to {process.env.NEXT_PUBLIC_APP_NAME}
            </p>
            {errorMismatch && (
              <p className="text-red-500 mt-2">{errorMismatch}</p>
            )}
            <div className="my-4">
              <label htmlFor="email">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="input-with-shadow w-full my-2 !py-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">
                Password <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-with-shadow w-full my-2 !py-4"
                />
                <div
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <FaRegEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white font-bold w-full py-3 uppercase disabled:bg-opacity-80 hover:bg-opacity-90  rounded-md duration-300 mt-2"
              >
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-light text-gray-500 mt-4">
                Don&apos;t have an account yet?{' '}
                <Link
                  href="/registration"
                  className="font-medium  text-primary hover:underline"
                >
                  Register Now
                </Link>
              </p>
              <p
                className="text-sm font-light text-white-500 cursor-pointer mt-4"
                onClick={() => setModalClose(true)}
              >
                Forgot Password?
              </p>
            </div>
          </form>
        </div>
      </div>
      <ForgotPass modal={modal} setModalClose={setModalClose} />
    </>
  );
};

export default LoginForm;
