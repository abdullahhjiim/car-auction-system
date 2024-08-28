/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Selector from "./Selector";
import { authAxios } from "/app/(home)/axious-config";
import { logout } from "/app/(home)/features";
import { clearNotification } from "/app/(home)/features/notification/notificationSlice";

const StepFour = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [idValue, setIdValue] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [choosenFile, setChoosenFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [country, setCountry] = useState(null);
  const [serverError, setServerError] = useState({});
  const { token } = useSelector((state) => state.auth);
  const [fileName, setFileName] = useState("No Selected File");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileRequired, setFileRequired] = useState("");

  const fronTValidation = () => {
    if (!fileUrl) {
      setFileRequired("File is required");
      return false;
    }

    if (idValue && documentNumber && expiryDate && country) {
      return true;
    } else {
      setFileRequired("Please fill up required field properly");
      return false;
    }
  };

  const handleFourthStep = (e) => {
    e.preventDefault();

    const validation = fronTValidation();
    if (validation) {
      setSubmitLoading(true);

      let obj = {};
      obj.type = idValue;
      obj.ref_number = documentNumber;
      obj.url = fileUrl;
      obj.expire_date = expiryDate;
      obj.country_id = country;

      const data = {};
      data.documents = [obj];

      authAxios
        .post("/members/store-document", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          dispatch(logout());
          dispatch(clearNotification());
          setSubmitLoading(false);
          showSwal(res?.data?.message ?? "Document Upload Successfully");
        })
        .catch((err) => {
          setServerError(err?.response?.data?.errors);
          setSubmitLoading(false);
        });
    }
  };

  const handleFile = ({ target: { files } }) => {
    setFileLoading(true);

    files[0] && setFileName(files[0].name);
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      authAxios
        .post("/members/upload-document", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setFileLoading(false);
          if (res?.data?.success) {
            setFileRequired("");
            setFileUrl(res?.data?.url);
            setChoosenFile({
              fileurl: URL.createObjectURL(files[0]),
              type: files[0].name.split(".").pop(),
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setFileLoading(false);
        });
    }
  };

  const showSwal = (message) => {
    withReactContent(Swal)
      .fire({
        title: message,
        showDenyButton: false,
        showCancelButton: false,
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

  return (
    <form
      onSubmit={handleFourthStep}
      className="max-w-[555px] mx-auto bg-white bg-opacity-10 p-4 md:p-12 rounded-md backdrop-blur-md mt-6"
    >
      <h4 className="text-2xl font-bold mb-4 text-white text-center">
        Please Fill Up the below Fields!
      </h4>
      <div>
        <label htmlFor="dob" className="text-white">
          Select Document Type<span className="text-primary">*</span>
        </label>
        <select
          required
          name="idType"
          id="idType"
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
          className="input-with-shadow w-full"
        >
          <option className="capitalize text-lg" value="">
            Select Document Type
          </option>
          <option className="capitalize text-lg" value="1">
            National/Emirates ID
          </option>
          <option className="capitalize text-lg" value="2">
            Business Licence
          </option>
          <option className="capitalize text-lg" value="3">
            Passport
          </option>
          <option className="capitalize text-lg" value="4">
            Driving Licence
          </option>
          <option className="capitalize text-lg" value="8">
            Other
          </option>
        </select>
      </div>
      <div className="my-4">
        <label htmlFor="id" className="text-white">
          Document Number<span className="text-primary">*</span>
        </label>
        <input
          type="number"
          name="id"
          placeholder={"Document Number"}
          required
          className="input-with-shadow w-full"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
        {serverError && serverError[0]?.ref_number && (
          <p className="text-red-500 font-sm mt-1">
            {serverError[0].ref_number[0]}
          </p>
        )}
      </div>

      <div className="text-start !mt-2">
        <label htmlFor="country" className="text-white">
          Select Country <span className="text-primary">*</span>
        </label>
        <Selector
          placeholder="Country"
          url={"/search/active-countries"}
          setValue={setCountry}
        />
        {serverError && serverError[0]?.country_id && (
          <p className="text-red-500 font-sm mt-1">
            {serverError[0].country_id[0]}
          </p>
        )}
      </div>

      <div className="my-4">
        <label htmlFor="expiryDate" className="text-white">
          Expire Date<span className="text-primary">*</span>
        </label>
        <input
          type="date"
          name="expiryDate"
          required
          className="input-with-shadow w-full"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        {serverError && serverError[0]?.expire_date && (
          <p className="text-red-500 font-sm mt-1">
            {serverError[0].expire_date[0]}
          </p>
        )}
      </div>
      <div>
        <label className="text-white py-2">
          Select File.<span className="text-primary">*</span>
        </label>
        <div>
          <div
            className="w-full h-40 cursor-pointer border-2 border-dashed border-[#ccc] rounded-md overflow-hidden flex justify-center items-center"
            onClick={() => document.querySelector(".file_upload_input").click()}
          >
            <input
              type="file"
              accept="application/pdf, image/*"
              className="file_upload_input"
              hidden
              onChange={handleFile}
            />

            {!choosenFile && (
              <div className="flex flex-col justify-center items-center gap-y-2 text-white">
                <MdCloudUpload className="text-primary" size={60} />
                <p>Browse Files To Upload</p>
              </div>
            )}
            {choosenFile && choosenFile?.type == "pdf" && (
              <iframe src={choosenFile?.fileurl}></iframe>
            )}
            {choosenFile && choosenFile?.type != "pdf" && (
              <img
                src={choosenFile?.fileurl}
                alt={fileName}
                className="max-w-[80%] w-auto h-36 object-cover"
              />
            )}
          </div>
          {serverError && serverError[0]?.url && (
            <p className="text-red-500 font-sm mt-1">{serverError[0].url[0]}</p>
          )}
          {fileRequired && (
            <p className="text-red-500 font-sm mt-1">{fileRequired}</p>
          )}

          {choosenFile && fileName && (
            <div className="flex items-center gap-x-2 text-white mt-2">
              <AiFillFileImage className="text-primary" />
              <span className="flex items-center gap-x-1">
                {fileName}{" "}
                <MdDelete
                  className="cursor-pointer hover:text-primary"
                  onClick={() => {
                    setFileName("No Selected File");
                    setChoosenFile(null);
                    setFileUrl("");
                    const fileInput =
                      document.querySelector(".file_upload_input");
                    if (fileInput) {
                      fileInput.value = "";
                    }
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={submitLoading || fileLoading}
          className="bg-primary text-white font-bold w-full py-3 uppercase disabled:bg-opacity-70 hover:bg-opacity-90 rounded-md duration-300 mt-2"
        >
          {submitLoading ? "Loading..." : "Upload Document"}
        </button>
      </div>
    </form>
  );
};

export default StepFour;
