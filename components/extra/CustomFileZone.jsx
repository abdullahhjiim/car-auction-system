/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const CustomFileZone = (props) => {
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
    acceptFileType,
    storeError,
  } = props;

  const [updateFile, setUpdateFile] = useState({});
  const [files, setFiles] = useState([]);
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const cloneFiles = [...files];
    for (let i = 0; i < cloneFiles?.length; i++) {
      if (cloneFiles[i].name === updateFile.name) {
        cloneFiles[i][updateFile.type] = updateFile.value;
        cloneFiles[i]["uploaded_name"] = updateFile.uploaded_name;
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
    setFiles([]);
    storeError("");

    try {
      const response = await axios.post(final_url, formData, {
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
        });

        storeSuccess(response.data);
      } else {
        setIsImageUploading(false);
        setUpdateFile({
          name: fileObject.name,
          type: "failed_upload",
          value: true,
          uploading: false,
        });
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status == 422) {
        storeError(error.response.data.errors?.file[0]);
      }

      setUpdateFile({
        name: fileObject.name,
        type: "failed_upload",
        value: true,
        uploading: false,
      });

      setFiles([]);
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

  return (
    <>
      <div className="">
        {title && <h5>{title}</h5>}

        <div className={buttonClass ?? "w-full"}>
          <div className="row">
            <div>
              <input
                type="file"
                ref={inputElement}
                multiple={multiple}
                onChange={handleFiles}
                accept={
                  acceptFileType ?? "image/jpeg,image/png,application/pdf"
                }
              />
              {hintText && (
                <p className="font-semibold text-xs pb-2">{hintText}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3  mt-2">
          {files &&
            files.map((objectPhoto, index) => (
              <div className={imgClass ?? "w-full"} key={index}>
                <div className="show-vehicle-img relative w-[180px]">
                  {objectPhoto.url &&
                    objectPhoto.url.split(".").pop() === "pdf" && (
                      <iframe
                        src={objectPhoto.url}
                        title={objectPhoto.name}
                        frameBorder="0"
                        height={200}
                        width={160}
                      ></iframe>
                    )}

                  <div className="absolute left-[40%] top-[45%]">
                    {!objectPhoto.failed_upload && objectPhoto.uploading && (
                      <p className="text-primary">Loading..</p>
                    )}
                  </div>

                  {!objectPhoto.failed_upload && (
                    <p
                      className="absolute -top-3 right-2  font-bold  w-8 h-8  rounded-full flex justify-center  cursor-pointer"
                      onClick={() => handelRemove(objectPhoto.url, index)}
                    >
                      <RxCrossCircled className="text-center mt-1 w-6 rounded-full h-6 bg-red-500 text-white" />
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CustomFileZone;
