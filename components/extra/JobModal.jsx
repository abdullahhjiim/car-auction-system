"use client";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomFileZone from "./CustomFileZone";
import { authAxios } from "/app/(home)/axious-config";

const sitekey = process.env.NEXT_PUBLIC_SITE_KEY;

const JobModal = ({ modal, setModalClose, jobId }) => {
  const recaptcha = useRef(null);
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [serverError, setServerError] = useState({});
  const [message, setMessage] = useState("");
  const [captChaError, setCaptchaError] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    email: "",
    phone: "",
    years_of_experience: "",
    visa_status: "",
    resume: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptchaError(null);
    setMessage(null);

    if (!token) {
      setCaptchaError("Captcha is Required");
    } else {
      const newErrors = {};

      // Check for empty fields
      for (const key in formData) {
        if (!formData[key]) {
          newErrors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
        }
      }

      // Update errors state
      setErrors(newErrors);

      // If no errors, submit form
      if (Object.keys(newErrors).length === 0) {
        // Add your form submission logic here

        authAxios
          .post(`/public-job-posts/apply`, { ...formData, job_post_id: jobId })
          .then((res) => {
            setMessage("Message sent successfully");
            toast(res.data.message ?? "", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            closeFunction();
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
    }
  };

  const onCaptchaChange = (captchaToken) => {
    if (captchaToken === null) {
      setToken(null);
    } else {
      setToken(captchaToken);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeFunction = () => {
    setFormData({
      name: "",
      father_name: "",
      email: "",
      phone: "",
      years_of_experience: "",
      visa_status: "",
    });
    setErrors({});
    setModalClose(false);
  };

  const storeSuccess = (params) => {
    setFormData({
      ...formData,
      resume: params.url,
    });
  };

  const removeFile = () => {
    setFormData({
      ...formData,
      resume: "",
    });
  };

  const storeError = (errMsg) => {
    setFormData({
      ...formData,
      resume: "",
    });

    console.log(errMsg);
    setErrors({ ...errors, resume: errMsg ?? "" });
  };

  return (
    <Dialog open={modal} size="sm" handler={closeFunction}>
      <DialogHeader>
        <div className="flex flex-row justify-between w-full">
          <h1>Apply for job</h1>
          <button
            onClick={closeFunction}
            className="bg-primary text-white w-8 h-8 rounded-full text-sm hover:opacity-60 duration-200"
          >
            X
          </button>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="bg-white px-4 rounded-md ">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="mb-1">
                <label className="block mb-1" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="Name"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.name}
                  </p>
                )}
                {serverError && serverError?.name && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.name[0]}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="block mb-1" htmlFor="father_name">
                  Father&apos;s Name:
                </label>
                <input
                  type="text"
                  id="father_name"
                  name="father_name"
                  value={formData.father_name}
                  placeholder="Father Name"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.father_name ? "border-red-500" : ""
                  }`}
                />
                {errors.father_name && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.father_name}
                  </p>
                )}
                {serverError && serverError?.father_name && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.father_name[0]}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="block mb-1" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.email}
                  </p>
                )}
                {serverError && serverError?.email && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.email[0]}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="block mb-1" htmlFor="phone">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder="Phone"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.phone}
                  </p>
                )}
                {serverError && serverError?.phone && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.phone[0]}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="block mb-1" htmlFor="years_of_experience">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="years_of_experience"
                  name="years_of_experience"
                  value={formData.years_of_experience}
                  placeholder="Years of Experience"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.years_of_experience ? "border-red-500" : ""
                  }`}
                />
                {errors.years_of_experience && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.years_of_experience}
                  </p>
                )}
                {serverError && serverError?.years_of_experience && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.years_of_experience[0]}
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="block mb-1" htmlFor="visa_status">
                  Visa Status:
                </label>
                <select
                  id="visa_status"
                  name="visa_status"
                  value={formData.visa_status}
                  placeholder="Visa Status"
                  onChange={handleInputChange}
                  className={`border-2 border-gray-300 rounded-md w-full px-4 py-2 ${
                    errors.visa_status ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Visa Status</option>
                  <option value="Citizen">Citizen</option>
                  <option value="Permanent Resident">Permanent Resident</option>
                  <option value="Work Visa">Work Visa</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Other">Other</option>
                </select>
                {errors.visa_status && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {errors.visa_status}
                  </p>
                )}
                {serverError && serverError?.visa_status && (
                  <p className="text-red-500 mt-1 text-sm font-semibold">
                    {serverError?.visa_status[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <CustomFileZone
                title="Resume"
                url="/api/v1/public-job-posts/upload-attachment"
                existingFilesArray={
                  formData.resume ? [{ url: formData.resume }] : []
                }
                storeSuccess={storeSuccess}
                setIsImageUploading={setIsImageUploading}
                removeFile={removeFile}
                multiple={false}
                acceptFileType={"application/pdf"}
                hintText="[Note: Maximum file size 5 mb and file format must be .pdf]"
                storeError={storeError}
              />
              {errors.resume && (
                <p className="text-red-500 text-sm font-semibold">
                  {errors.resume}
                </p>
              )}
              {serverError && serverError?.resume && (
                <p className="text-red-500 mt-1 text-sm font-semibold">
                  {serverError?.resume[0]}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="">
                <ReCAPTCHA
                  size="normal"
                  sitekey={sitekey}
                  onChange={onCaptchaChange}
                  ref={recaptcha}
                />
                {captChaError && (
                  <p className="text-red-500 text-sm font-semibold">
                    {captChaError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isImageUploading}
                className="bg-primary text-white px-2 py-1 font-semibold rounded-md hover:bg-opacity-60 duration-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default JobModal;
