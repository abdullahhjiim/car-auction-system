import { clearErroState, loginUser } from '/app/(home)/features';
import logo from '@/public/logo.png';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = ({ modal, setModalClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMismatch, setErrorMismatch] = useState('');
  const { isAuthenticated, user, loading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const clearAll = () => {
    setEmail('');
    setPassword('');
    setErrorMismatch('');
    dispatch(clearErroState());
  };

  useEffect(() => {
    setErrorMismatch('');

    if (isAuthenticated) {
      if (
        (user.role == 7 || user.role == 6) &&
        user?.required_documents == true
      ) {
        router.push('/registration?step=4');
      } else {
        if (successMessage) {
          //   toast(successMessage, {
          //     position: "top-right",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   });

          dispatch(clearErroState());
          window.location.reload();
        }
      }
      setModalClose();
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

        setErrorMismatch('Something Went Wrong');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, error, loading]);

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

  const closeFunction = () => {
    clearAll();
    setModalClose();
  };

  return (
    <Dialog open={modal} size="xs" handler={closeFunction}>
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
              Sign in to {process.env.NEXT_PUBLIC_APP_NAME}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errorMismatch && (
              <p className="text-red-500 m-2 text-sm font-semibold ">
                {errorMismatch}
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password <span className="text-primary">*</span>
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline hover:opacity-70 duration-200"
                >
                  {loading ? 'Loading...' : 'Sign in'}
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

export default LoginModal;
