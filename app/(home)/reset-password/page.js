"use client";
import car1 from "@/public/car1.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { authAxios } from "../axious-config";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMismatch, setErrorMismatch] = useState("");
  const [approveMessage, setApproveMessage] = useState("");
  const [serverError, setServerError] = useState({});

  const closeForm = () => {
    setPassword("");
    setConfirmPassword("");
    setServerError("");
  };

  const showSwal = (message) => {
    withReactContent(Swal)
      .fire({
        title: message,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#B20A0B",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
  };

  const _hanleSubmit = (e) => {
    const token = searchParams.get("token");
    e.preventDefault();
    setErrorMismatch("");
    setServerError({});
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        let formData = new FormData();

        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        formData.append("token", token);

        authAxios
          .post(`/auth/reset-password`, formData)
          .then((res) => {
            closeForm();
            setLoading(false);
            setApproveMessage(res?.data?.message);
            showSwal(res?.data?.message);
          })
          .catch((err) => {
            if (err?.response?.status == 422) {
              setServerError(err?.response?.data?.errors);
            } else {
              setErrorMismatch(
                err?.response?.data?.message ?? "Something went wrong"
              );
            }
            setLoading(false);
          });
      } else {
        setErrorMismatch("Password does not Match");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-[60vh] md:min-h-[90vh]">
        <div className="hidden md:block md:w-[44%]">
          <div className="flex justify-center items-center h-full w-full max-h-[90vh]">
            <Image
              src={car1}
              alt="abstract"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-[56%] bg-primary bg-opacity-5 p-4 md:p-12 lg:p-20 text-center flex justify-center items-center">
          <div className="w-full">
            <form
              onSubmit={_hanleSubmit}
              className="text-start max-w-[555px] mx-auto bg-black bg-opacity-5 p-4 md:p-12 rounded-md backdrop-blur-md mt-6"
            >
              <p className="opacity-75 font-semibold font-sl">
                Reset Your Password
              </p>
              {errorMismatch && (
                <p className="text-red-500 mt-2">{errorMismatch}</p>
              )}
              {approveMessage && (
                <p className="text-green-500 mt-2">
                  {approveMessage}{" "}
                  <Link href="/login" className="underline underline-offset-1">
                    Login
                  </Link>{" "}
                </p>
              )}
              <div className="my-4">
                <label htmlFor="password">
                  Password <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    name="password"
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
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
              <div>
                <label htmlFor="password">
                  Confirm Password <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    name="confirm_password"
                    placeholder="Enter Confirm Password"
                    type={showConPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-with-shadow w-full my-2 !py-4"
                  />
                  <div
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
                    onClick={() => setShowConPassword((prev) => !prev)}
                  >
                    {showConPassword ? (
                      <FaRegEye size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </div>
                </div>
              </div>
              {serverError && serverError?.password && (
                <p className="text-red-300 font-bold text-sm">
                  {serverError?.password[0]}
                </p>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white font-bold w-full py-3 uppercase disabled:bg-opacity-80 hover:bg-opacity-90  rounded-md duration-300 mt-2"
                >
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
