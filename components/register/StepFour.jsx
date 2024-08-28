/* eslint-disable @next/next/no-img-element */
"use client";

import { authAxios } from "/app/(home)/axious-config";
import { logout } from "/app/(home)/features";
import { clearNotification } from "/app/(home)/features/notification/notificationSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Selector from "./Selector";

const StepFour = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [country, setCountry] = useState({});
  const [attachFile, setAttachFile] = useState({});
  const [number, setNumber] = useState({});
  const [expireDate, setExpireDate] = useState({});
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [documentsData, setDocumentsData] = useState([]);
  const [requiredDocTypes, setRequiredDocTypes] = useState([]);
  const [fileError, setFileError] = useState({});

  useEffect(() => {
    authAxios
      .get("/members/documents")
      .then((res) => {
        const _data = res.data?.data;
        const _required_document_types = res.data?.required_document_types;
        setDocumentsData(_data);
        setRequiredDocTypes(_required_document_types);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fileCheck = (type) => {
    return ["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(type);
  };

  const showSwal = (message) => {
    withReactContent(Swal)
      .fire({
        title: message,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login",
        confirmButtonColor: "#B20A0B",
        buttonsStyling: false,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInDown
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutUp
            animate__faster
          `,
        },
        customClass: {
          confirmButton: "bg-[#B20A0B]  text-white px-9 py-2 rounded-md hover:bg-[#B20A0B]/90",
          title: "text-lg pt-5 text-orange-900",
        },
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
  };

  const handleFiles = async (e, element) => {
    const inputFiles = e.target.files;

    setFileError({});

    if (fileCheck(inputFiles[0].type)) {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append("file", inputFiles[0]);
      try {
        const response = await authAxios.post("/members/upload-document", formData);

        if (response?.data?.success) {
          setAttachFile({ ...attachFile, [element]: response?.data?.url });

          let errors = { ...error, file: "" };
          setError(errors);
          setSubmitLoading(false);
        }
      } catch (error) {
        console.log(error);
        setAttachFile({ ...attachFile, [element]: "" });
        let errors = { ...error, file: "Something Went Wrong" };
        setError(errors);
        setSubmitLoading(false);
      }
    } else {
      e.target.value = "";
      setFileError({ ...fileError, [element]: "File format is not Valid" });
    }
  };

  const _handleNumber = (e, element) => {
    let { value } = e.target;
    setNumber({ ...number, [element]: value });
  };

  const _documentValidation = () => {
    return false;
  };

  const _prepareDocumentData = () => {
    const prepareData = [];

    Object.keys(requiredDocTypes).map((e, i) => {
      let obj = {};
      obj.title = requiredDocTypes[e].title;
      obj.type = e;
      obj.url = attachFile[e] ?? "";
      obj.expire_date = expireDate[e] ?? "";
      obj.country_id = country[e] ?? "";
      obj.ref_number = number[e] ?? "";
      prepareData.push(obj);
    });

    return prepareData;
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const validate = _documentValidation();

    if (!validate) {
      const prepareData = _prepareDocumentData();

      setSubmitLoading(true);
      const data = {};
      data.documents = prepareData;

      authAxios
        .post("/members/store-document", data)
        .then((res) => {
          setSubmitLoading(false);

          dispatch(logout());
          dispatch(clearNotification());
          setSubmitLoading(false);
          showSwal(res?.data?.message ?? "Document Upload Successfully");
        })
        .catch((err) => {
          console.log(err);

          setError(err?.response?.data?.errors);
          setSubmitLoading(false);
        });
    }
  };

  const labelOfStatus = {
    1: "text-green-500",
    2: "text-blue-500",
    5: "text-red-500",
    10: "text-red-300",
  };

  return (
    <div className="max-w-[1000px] mx-auto bg-white bg-opacity-10 p-4 md:p-12 rounded-md backdrop-blur-md mt-6">
      <h4 className="text-2xl font-bold mb-4 text-white text-center">
        Please Fill Up the below Fields!
      </h4>

      <div>
        {Object.keys(requiredDocTypes).length > 0 && (
          <form onSubmit={_handleSubmit}>
            {Object.keys(requiredDocTypes).map((element, i) => {
              return (
                <div key={i}>
                  <div className="py-2 text-xl font-bold text-white">
                    <h4>{requiredDocTypes[element]?.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2/4">
                      <label htmlFor="country" className="text-white">
                        Select Country <span className="text-primary">*</span>
                      </label>
                      <Selector
                        placeholder="Country"
                        url={"/search/active-countries"}
                        setValue={(value) => setCountry({ ...country, [element]: value })}
                      />
                      {error && error[i]?.country_id && (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                          {error[i].country_id[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="Number" className="text-white">
                        {requiredDocTypes[element]?.ref_number_label}{" "}
                        <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={requiredDocTypes[element]?.ref_number_label}
                        value={number[element]}
                        onChange={(e) => _handleNumber(e, element)}
                        className="input-with-shadow w-full"
                        required
                      />
                      {error && error[i]?.ref_number && (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                          {error[i].ref_number[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="text-white">
                        Expire Date<span className="text-primary">*</span>
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        required
                        className="input-with-shadow w-full"
                        value={expireDate[element]}
                        min={new Date().toISOString().substr(0, 10)}
                        onChange={(e) =>
                          setExpireDate({
                            ...expireDate,
                            [element]: e.target.value,
                          })
                        }
                      />
                      {error && error[i]?.expire_date && (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                          {error[i]?.expire_date[0]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="text-white">
                        Attach File<span className="text-primary">*</span>
                      </label>
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                        required
                        className=" w-full border-2 border-solid border-white-500 rounded-md py-1 px-2"
                        onChange={(e) => handleFiles(e, element)}
                      />
                      {error && error[i]?.url && (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                          {error[i]?.url[0]}
                        </p>
                      )}
                      {fileError && fileError?.[element] && (
                        <p className="text-red-500 font-semibold text-sm mt-1">
                          {fileError?.[element]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-right">
              <button
                type="submit"
                disabled={submitLoading}
                className="p-2 m-2 bg-primary rounded-md text-white hover:bg-opacity-60 disabled:bg-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      {documentsData.length > 0 && (
        <div className="">
          <div className="">
            <h4 className="p-2 text-xl text-white">Documents Added</h4>

            {documentsData.map((e) => {
              return (
                <div key={e.id} className="bg-white p-3 mb-3" style={{ borderRadius: "5px" }}>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th style={{ width: "33.33%" }}>{e.type_name}</th>
                        <th style={{ width: "33.33%" }}>Uploaded on</th>
                        <th style={{ width: "33.33%" }} className="text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{e?.country_name}</td>
                        <td>{e?.uploaded_on}</td>
                        <td className="text-center font-bold text-sm">
                          <span className={labelOfStatus[e.status]}>{e?.status_name}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepFour;
