/* eslint-disable @next/next/no-img-element */
import { authAxios } from "@/app/(home)/axious-config";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const FileZone = (props) => {
  const inputElement = useRef();
  const { token } = useSelector((state) => state.auth);
  const {
    title,
    url,
    existingFilesArray,
    storeSuccess,
    removeFile,
    multiple,
    buttonClass,
    imgClass,
    setIsImageUploading,
    hintText,
    vccError,
    storeVcc,
    vcc_document,
    setVccError,
  } = props;

  const [updateFile, setUpdateFile] = useState({});
  const [files, setFiles] = useState([]);
  const [percentage, setPercentage] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  useEffect(() => {
    const cloneFiles = [...files];
    for (let i = 0; i < cloneFiles?.length; i++) {
      if (cloneFiles[i].name === updateFile.name) {
        cloneFiles[i][updateFile.type] = updateFile.value;
        cloneFiles[i]["uploaded_name"] = updateFile.uploaded_name;
        cloneFiles[i]["uploading"] = updateFile.uploading ? true : false;
        cloneFiles[i]["error_message"] = updateFile?.error_message;
        cloneFiles[i]["fileUrl"] = updateFile?.fileUrl;
        break;
      }
    }
    setFiles(cloneFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFile]);

  useEffect(() => {
    if (existingFilesArray?.length > 0) {
      setFiles(existingFilesArray);
    }
  }, [existingFilesArray]);

  const handelRemove = (name, index) => {
    let newFileArray = [...files];
    newFileArray.splice(index, 1);
    setFiles(newFileArray);
    removeFile(name);
  };

  const isFileExits = (fileName) => {
    return files.find((single) => fileName === single.name);
  };

  const fileUpload = async (fileArrayOfObject, index = 0) => {
    let fileObject = fileArrayOfObject[index];
    const final_url = process.env.NEXT_PUBLIC_BASE_URL + url;
    const formData = new FormData();
    formData.append("file", fileObject);
    setIsImageUploading(true);

    try {
      const response = await authAxios.post(final_url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setIsImageUploading(false);
        setUpdateFile({
          name: fileObject.name,
          type: "uploading",
          value: false,
          uploaded_name: response.data.filename,
          error_message: "",
          fileUrl: response?.data?.url,
        });

        storeSuccess(response.data);
      } else {
        setIsImageUploading(false);
        setUpdateFile({
          name: fileObject.name,
          type: "failed_upload",
          value: true,
          uploading: false,
          error_message: "Failed to upload",
          fileUrl: "",
        });
      }
    } catch (error) {
      let error_message = "";
      if (error?.response?.status == 422) {
        if (error?.response?.data?.errors?.file) {
          setFileErrorMessage(error?.response?.data?.errors?.file[0]);
          error_message = error?.response?.data?.errors?.file[0];
        }
      }

      setUpdateFile({
        name: fileObject.name,
        type: "failed_upload",
        value: true,
        uploading: false,
        error_message: error_message,
        fileUrl: "",
      });
    }

    if (index + 1 < fileArrayOfObject?.length) {
      fileUpload(fileArrayOfObject, index + 1);
    }
    setPercentage(((index + 1) * 100) / fileArrayOfObject?.length);
  };

  const handleFiles = (e) => {
    const inputFiles = e.target.files;

    let fileArray = [];
    let allFileArray = [];

    Object.values(inputFiles).forEach((element) => {
      if (!isFileExits(element.name)) {
        fileArray.push({
          name: element.name,
          url: URL.createObjectURL(element),
          file: element,
          uploading: true,
          type: element.type,
          uploaded_name: "",
        });

        allFileArray.push(element);
      }
    });

    fileUpload(allFileArray);

    if (multiple) {
      setFiles(files.concat(fileArray));
    } else {
      setFiles(fileArray);
    }

    e.target.value = "";
  };

  const handleVccFile = async (event) => {
    const file = event.target.files[0];

    const final_url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/vehicles-document-upload";
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authAxios.post(final_url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        storeVcc(response?.data?.url);
      } else {
        storeVcc("");
        event.target.value = "";
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
      storeVcc("");
      setVccError(error?.response?.data?.message);
      event.target.value = "";
    }
  };

  return (
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-4 ">
          <div className="mt-4">
            {title && <h5>{title}</h5>}
            <div className={buttonClass ?? "w-full"}>
              <div className="row">
                <div>
                  <input
                    type="file"
                    ref={inputElement}
                    multiple={multiple}
                    onChange={handleFiles}
                    accept="image/jpeg,image/png,application/pdf"
                  />
                </div>
                <div className="text-[10px] font-semibold">{hintText}</div>
              </div>
            </div>
          </div>
          <div className="">
            <label htmlFor="vcc" className="text-primary font-medium mb-1">
              VCC Document *
            </label>
            <div className="flex justify-between  items-center gap-2">
              <input
                id="vcc_document"
                type="file"
                placeholder="VCC Document"
                onChange={handleVccFile}
                className={` text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
              />
              {vcc_document && (
                <a
                  className=" px-2 py-1 rounded-md font-semibold hover:underline"
                  href={vcc_document}
                  target="_blank"
                >
                  Preview
                </a>
              )}
            </div>
            <div className="text-[10px] font-semibold ml-2">
              [Note : accept only jpg,jpeg,png,pdf.]
            </div>
            {vccError && (
              <p className="text-primary text-xs font-semibold">{vccError}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3  mt-8">
          {files &&
            files.map((objectPhoto, index) => (
              <div className={imgClass ?? "w-full"} key={index}>
                <div className="show-vehicle-img relative">
                  {objectPhoto.type !== "application/pdf" &&
                    objectPhoto.type !== "pdf" && (
                      <img
                        src={objectPhoto.url}
                        alt="image"
                        className={objectPhoto.failed_upload ? "blur-sm" : ""}
                      />
                    )}

                  {(objectPhoto.type === "application/pdf" ||
                    objectPhoto.type === "pdf") && (
                    <iframe
                      src={objectPhoto.url}
                      title={objectPhoto.name}
                      height={200}
                      width={160}
                    ></iframe>
                  )}

                  <div className="absolute left-[40%] top-[45%]">
                    {objectPhoto.uploading && (
                      <p className="text-primary">Loading..</p>
                    )}
                    {objectPhoto.failed_upload && (
                      <p className="bg-primary text-white w-6 h-6 flex justify-center rounded-full">
                        x
                      </p>
                    )}
                  </div>

                  <p
                    className="absolute top-0 right-0 text-white bg-primary w-6 h-6 rounded-full flex justify-center cursor-pointer"
                    onClick={() => handelRemove(objectPhoto?.fileUrl, index)}
                  >
                    X
                  </p>
                </div>
                {objectPhoto?.error_message && (
                  <p className="text-xs text-red-500">
                    {objectPhoto.error_message}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FileZone;
