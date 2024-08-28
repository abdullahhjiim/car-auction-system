"use client";

import FileZone from "@/components/common/FileZone";
import HtmlIframe from "@/components/extra/HtmlFrame";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authAxios } from "/app/(home)/axious-config";
import { customOptions } from "/app/(home)/utils/customOptions";

const autoCompleteFieldName = {
  make_id: "",
  vehicle_model_id: "",
  color_id: "",
};

const VehicleModal = ({ setModalOpened, editItem, setEditItem, modal }) => {
  const modalBox = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const [uploadedFile, setUploadedFile] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [commonOptions, setCommonOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [fileError, setFileError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [autoFillLoading, setAutoFillLoading] = useState(false);
  const [tcModal, setTcModal] = useState(false);
  const [content, setContent] = useState("");
  const [vccError, setVccError] = useState("");
  const [vccDocument, setVccDocument] = useState("");

  const file_urls = {
    photos: [],
  };

  const [fileUrls, setFileUrls] = useState(file_urls);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [autoCompleteName, setAutoCompleteName] = useState(
    autoCompleteFieldName
  );

  let initial = {};

  if (editItem && editItem?.id) {
    initial = {
      ...editItem,
      reserve_amount:
        editItem?.sale_type == "2" && editItem?.reserve_amount
          ? editItem?.reserve_amount
          : "",
      terms_condition: true,
    };
  } else {
    initial = {
      vin: "",
      year: "",
      make_id: "",
      vehicle_model_id: "",
      body_style_id: "",
      engine_type_id: "",
      fuel_type_id: "",
      drive_train_id: "",
      transmission_id: "",
      cylinder_id: "",
      primary_damage_id: "",
      secondary_damage_id: "",
      odometer: "",
      color_id: "",
      mileage_type_id: "",
      keys: "1",
      category_id: "",
      start_bid_amount: "",
      sale_type: "",
      selling_price: "",
      reserve_amount: "",
      terms_condition: "",
      vcc_document: "",
      file_urls: {},
    };
  }

  useEffect(() => {
    if (editItem.id) {
      setAutoCompleteName({
        ...autoCompleteName,
        make_id: editItem?.make_id ? editItem?.make_id : "",
        make_name: editItem?.make ? editItem?.make : "",
        color_id: editItem?.color_id ? editItem?.color_id : "",
        color_name: editItem?.color ? editItem?.color : "",
        vehicle_model_id: editItem?.vehicle_model_id
          ? editItem?.vehicle_model_id
          : "",
        vehicle_model_name: editItem?.model ? editItem?.model : "",
        body_style_id: editItem?.body_style_id ? editItem?.body_style_id : "",
        body_style_name: editItem?.body_style ? editItem?.body_style : "",
        category_id: editItem?.category_id ? editItem?.category_id : "",
        category_name: editItem?.category_name ? editItem?.category_name : "",
        title_code_id: editItem?.title_code_id ? editItem?.title_code_id : "",
        title_code_name: editItem?.title_code ? editItem?.title_code : "",
        primary_damage_name: editItem?.primary_damage
          ? editItem?.primary_damage
          : "",
        primary_damage_id: editItem?.primary_damage_id
          ? editItem?.primary_damage_id
          : "",
        secondary_damage_name: editItem?.secondary_damage
          ? editItem?.secondary_damage
          : "",
        secondary_damage_id: editItem?.secondary_damage_id
          ? editItem?.secondary_damage
          : "",
        vehicle_type_id: editItem?.vehicle_type_id
          ? editItem?.vehicle_type
          : "",
        vehicle_type_name: editItem?.vehicle_type ? editItem?.vehicle_type : "",
        engine_type_id: editItem?.engine_type_id
          ? editItem?.engine_type_id
          : "",
        engine_type_name: editItem?.engine_type ? editItem?.engine_type : "",
        drive_train_id: editItem?.drive_train_id
          ? editItem?.drive_train_id
          : "",
        drive_train_name: editItem?.drive_train ? editItem?.drive_train : "",
        sale_type: editItem?.sale_type ? editItem?.sale_type : "",
        sale_type_name: editItem?.sale_type_name
          ? editItem?.sale_type_name
          : "",
        fuel_type_id: editItem?.fuel_type_id ? editItem?.fuel_type_id : "",
        fuel_type_name: editItem?.fuel_type ? editItem?.fuel_type : "",
        mileage_type_id: editItem?.mileage_type_id
          ? editItem?.mileage_type_id
          : "",
        mileage_type_name: editItem?.mileage_type ? editItem?.mileage_type : "",
        cylinder_id: editItem?.cylinder_id ? editItem?.cylinder_id : "",
        cylinder_name: editItem?.cylinder ? editItem?.cylinder : "",
        highlight_id: editItem?.highlight_id ? editItem?.highlight_id : "",
        highlight_name: editItem?.highlight ? editItem?.highlight : "",
        transmission_id: editItem?.transmission_id
          ? editItem?.transmission_id
          : "",
        transmission_name: editItem?.transmission ? editItem?.transmission : "",
      });
      setFileUrls(editItem?.file_urls);
      setVccDocument(editItem?.vcc_document);
    } else {
      setAutoCompleteName({});
    }

    if (editItem?.make_id) {
      getModel(editItem?.make_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editItem]);

  const getModel = (makeId) => {
    authAxios
      .get(`/search/vehicle-models?make_id=${makeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setModelOptions(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    authAxios
      .get(`/search/vehicle-static-data-options`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCommonOptions(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    authAxios
      .get(`/search/makes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMakeOptions(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    authAxios
      .get(`/search/vehicle-colors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setColorOptions(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    authAxios
      .get(`/page-by-event/TERMS_AND_CONDITIONS`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setContent(res?.data?.data?.body);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;

    setEditItem({});
    formik.resetForm();
    formik.setValues(formik.initialValues);

    setFileUrls({
      photos: [],
    });
    setModalOpened(false);
  };

  const vehicleAddUpdate = (values) => {
    setSubmitLoading(true);
    setGlobalError("");
    const finalData = {
      ...values,
      vcc_document: vccDocument,
      file_urls: fileUrls,
    };
    const url = editItem?.id
      ? `/member-vehicles/${editItem.id}`
      : `/member-vehicles`;
    const method = editItem?.id ? `put` : `post`;
    authAxios[method](url, finalData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        toast(res?.data?.message ?? "Successfully Submit Request", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setSubmitLoading(false);
        modalClose();

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoading(false);
        if (err?.response?.status == 422) {
          let errs = err?.response?.data?.errors;
          let errorList = {};
          Object.keys(errs).map((keyItem) => {
            errorList[keyItem] = errs[keyItem][0];
          });

          formik.setErrors(errorList);
        } else if (err?.response?.status == 400) {
          setGlobalError(err?.response?.data?.message);
        }
      });
  };

  const hanldeFileValidation = () => {
    if (fileUrls?.photos.length > 0) {
      return true;
    } else {
      setFileError("Vehicle Photos is Required");
      return false;
    }
  };

  const storeVcc = (url) => {
    setVccDocument(url);
  };

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: initial,
    validate: (values) => {
      const errors = {};

      if (!values.vin) {
        errors.vin = "Vin is Required";
      }

      if (!values.terms_condition) {
        errors.terms_condition = "Terms & condition is Required";
      }
      if (!values.year) {
        errors.year = "Year is Required";
      }

      if (!values.make_id) {
        errors.make_id = "Make is Required";
      }

      if (!values.vehicle_model_id) {
        errors.vehicle_model_id = "Model is Required";
      }

      if (!values.body_style_id) {
        errors.body_style_id = "Body Style is Required";
      }

      if (!values.engine_type_id) {
        errors.engine_type_id = "Engine Type is Required";
      }

      if (!values.fuel_type_id) {
        errors.fuel_type_id = "Fuel Type is Required";
      }

      if (!values.drive_train_id) {
        errors.drive_train_id = "Drive Train is Required";
      }

      if (!values.transmission_id) {
        errors.transmission_id = "Transmission is Required";
      }

      if (!values.cylinder_id) {
        errors.cylinder_id = "Cylinder is Required";
      }

      if (!values.primary_damage_id) {
        errors.primary_damage_id = "Primary Damage is Required";
      }

      if (!values.secondary_damage_id) {
        errors.secondary_damage_id = "Secondary Damage is Required";
      }

      if (!values.odometer) {
        errors.odometer = "Odometer is Required";
      }

      if (!values.color_id) {
        errors.color_id = "Color is Required";
      }

      if (!values.mileage_type_id) {
        errors.mileage_type_id = "Mileage Type is Required";
      }

      if (!values.highlight_id) {
        errors.highlight_id = "Highlight is Required";
      }

      if (!values.category_id) {
        errors.category_id = "Vehicle Category is Required";
      }

      if (values.category_id == 1) {
        if (!values.start_bid_amount) {
          errors.start_bid_amount = "Start Bid Amount is Required";
        }

        if (!values.sale_type) {
          errors.sale_type = "Sale Type is Required";
        }
        if (values.sale_type == 2) {
          if (!values.reserve_amount) {
            errors.reserve_amount = "Reserve Price is Required";
          }
        }
      }

      if (values.category_id == 2) {
        if (!values.selling_price) {
          errors.selling_price = "Selling Price is Required";
        }
      }

      if (!vccDocument) {
        errors.vcc_document = "Required";
        setVccError("Vcc Document is Required");
      } else {
        setVccError("");
      }

      console.log(errors);

      return errors;
    },

    onSubmit: (values) => {
      setFileError("");
      if (hanldeFileValidation()) {
        vehicleAddUpdate(values);
      }
    },
  });

  const handleSelectChange = (e, id, name) => {
    if (id === "make_id") {
      // setMakeUrlStr({ text: "", skip: false });
      if (e) {
        formik.setValues({
          ...formik.values,
          make_id: e?.value,
          vehicle_model_id: "",
        });
        setAutoCompleteName({
          ...autoCompleteName,
          make_id: e?.value,
          make_name: e?.label,
          vehicle_model_id: "",
          vehicle_model_name: "",
        });
        getModel(e?.value);
      } else {
        setAutoCompleteName({
          ...autoCompleteName,
          make_id: "",
          make_name: "",
          vehicle_model_id: "",
          vehicle_model_name: "",
        });
        formik.setValues({
          ...formik.values,
          make_id: "",
          vehicle_model_id: "",
        });
        setModelOptions([]);
      }
    } else {
      if (id === "vehicle_model_id" && autoCompleteName.make_id) {
        // setModelUrlStr({
        //   text: `?make_id=${autoCompleteName.make_id}`,
        //   skip: false,
        // });
      } else if (id === "seller_id") {
        // setSellerUrlStr({ text: "", skip: false });
      }
      if (e) {
        formik.setValues({
          ...formik.values,
          [id]: e?.value,
        });
        setAutoCompleteName({
          ...autoCompleteName,
          [id]: e?.value,
          [name]: e?.label,
        });
      } else {
        formik.setValues({
          ...formik.values,
          [id]: "",
        });
        setAutoCompleteName({
          ...autoCompleteName,
          [id]: "",
          [name]: ``,
        });
      }
    }
  };

  const storeSuccess = (successResponse) => {
    setFileError("");
    if (successResponse?.success) {
      setFileUrls((prevState) => {
        const photos = [...prevState.photos];
        photos.push(successResponse.url);
        return { ...prevState, photos };
      });
    }
  };

  const removeFile = (removeUrl) => {
    const cloneValues = JSON.parse(JSON.stringify(fileUrls));
    let index = cloneValues.photos
      ? cloneValues.photos.findIndex((x) => x === removeUrl)
      : -1;

    if (index > -1) {
      cloneValues.photos.splice(index, 1);
      setFileUrls(cloneValues);
    }
  };

  const handleRadioButton = (e) => {
    formik.setValues({ ...formik.values, keys: e.target.value });
  };

  const handleVinAutoFill = (vin) => {
    if (vin.toString().length == 17) {
      setAutoFillLoading(true);

      authAxios
        .post(
          "/vehicles/auto-fill-by-vin",
          { vin },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setAutoFillLoading(false);
          // setModelUrlStr({ text: `?make_id=${res.data?.make_id}`, skip: false });
          getModel(res.data?.make_id);

          setAutoCompleteName({
            ...autoCompleteName,
            make_id: res.data?.make_id ? res.data?.make_id : "",
            make_name: res.data?.make_name ? res.data?.make_name : "",
            vehicle_model_id: res.data?.model_id ? res.data?.model_id : "",
            vehicle_model_name: res.data?.model_name
              ? res?.data?.model_name
              : "",
          });

          formik.setValues({
            ...formik.values,
            make_id: res.data?.make_id,
            vehicle_model_id: res.data?.model_id,
            year: res?.data?.year,
          });
        })
        .catch((err) => {
          console.log(err);
          setAutoFillLoading(false);
        });
    }
  };

  const tcModalClose = () => {
    setTcModal(false);
  };

  const handleTermAndCond = (event) => {
    const { checked } = event.target;

    if (checked) {
      formik.setValues({
        ...formik.values,
        terms_condition: true,
      });
    } else {
      formik.setValues({
        ...formik.values,
        terms_condition: "",
      });
    }
  };

  return (
    <>
      <Dialog open={modal} size="lg" onClose={modalClose}>
        <DialogHeader>
          <div className="w-full flex justify-between rounded-md items-center bg-primary text-white p-2">
            <h4>{editItem?.id ? "Edit Vehicle" : "New Vehicle"}</h4>
            <FaTimes
              className="cursor-pointer hover:rotate-90 hover:scale-125 duration-300"
              onClick={modalClose}
            />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="h-[80vh] overflow-hidden overflow-y-auto">
            {/* form */}
            <div className="py-6 px-4 md:px-8">
              {editItem?.id && editItem?.status == 50 && (
                <p className="mb-6 font-semibold">{editItem?.rejection_note}</p>
              )}

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="vin"
                      className="text-primary font-medium mb-1"
                    >
                      VIN *
                    </label>
                    <div className="flex justify-between gap-2">
                      <input
                        name="vin"
                        id="vin"
                        type="text"
                        placeholder="Enter VIN"
                        className={`${
                          formik.errors.vin
                            ? "border-red-300"
                            : "border-gray-300"
                        } bg-gray-50 border  shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                        onChange={formik.handleChange}
                        value={formik.values.vin}
                        isTouched={formik.touched.vin}
                        invalidFeedback={formik.errors.vin}
                        isValid={formik.isValid}
                      />
                      <button
                        type="button"
                        disabled={autoFillLoading}
                        onClick={() => handleVinAutoFill(formik.values.vin)}
                        className="bg-primary text-white rounded-md px-2 py-1 w-[100px] hover:bg-opacity-60"
                      >
                        Auto Fill
                      </button>
                    </div>
                    {formik.errors && formik.errors?.vin && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.vin}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="year"
                      className="text-primary font-medium mb-1"
                    >
                      Year *
                    </label>
                    <input
                      id="year"
                      type="text"
                      placeholder="Year"
                      className={` ${
                        formik.errors.year
                          ? "border-red-300"
                          : "border-gray-300"
                      } bg-gray-50 border  shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                      onChange={formik.handleChange}
                      value={formik.values.year}
                      isTouched={formik.touched.year}
                      invalidFeedback={formik.errors.year}
                      isValid={formik.isValid}
                    />
                    {formik.errors && formik.errors?.year && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.year}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="make"
                      className="text-primary font-medium mb-1"
                    >
                      Make *
                    </label>
                    <Select
                      isClearable={autoCompleteName?.make_id ? true : false}
                      label="Select Make"
                      id="make_id"
                      options={customOptions(makeOptions)}
                      onChange={(e) =>
                        handleSelectChange(e, "make_id", "make_name")
                      }
                      value={{
                        label: autoCompleteName?.make_name ? (
                          autoCompleteName?.make_name
                        ) : (
                          <div className="text-gray-400">Search Make</div>
                        ),
                        value: autoCompleteName?.make_id,
                      }}
                      className={
                        formik.errors?.make_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.make_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.make_id}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="model"
                      className="text-primary font-medium mb-1"
                    >
                      Model *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.vehicle_model_id ? true : false
                      }
                      label="Select Model"
                      id="vehicle_model_id"
                      options={customOptions(modelOptions)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "vehicle_model_id",
                          "vehicle_model_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.vehicle_model_name ? (
                          autoCompleteName?.vehicle_model_name
                        ) : (
                          <div className="text-gray-400">Search Model</div>
                        ),
                        value: autoCompleteName?.vehicle_model_id,
                      }}
                      className={
                        formik.errors?.vehicle_model_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.vehicle_model_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.vehicle_model_id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="vin"
                      className="text-primary font-medium mb-1"
                    >
                      Body Style *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.body_style_id ? true : false
                      }
                      label="Select Body Style"
                      id="body_style_id"
                      options={customOptions(commonOptions?.body_styles)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "body_style_id",
                          "body_style_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.body_style_name ? (
                          autoCompleteName?.body_style_name
                        ) : (
                          <div className="text-gray-400">Search Body Style</div>
                        ),
                        value: autoCompleteName?.body_style_id,
                      }}
                      className={
                        formik.errors?.body_style_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.body_style_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.body_style_id}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="engine_type"
                      className="text-primary font-medium mb-1"
                    >
                      Engine Type *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.engine_type_id ? true : false
                      }
                      label="Select Engine Type"
                      id="engine_type_id"
                      options={customOptions(commonOptions?.engine_type)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "engine_type_id",
                          "engine_type_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.engine_type_name ? (
                          autoCompleteName?.engine_type_name
                        ) : (
                          <div className="text-gray-400">
                            Search Engine Type
                          </div>
                        ),
                        value: autoCompleteName?.engine_type_id,
                      }}
                      className={
                        formik.errors?.engine_type_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.engine_type_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.engine_type_id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="fuel_type"
                      className="text-primary font-medium mb-1"
                    >
                      Fuel Type *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.fuel_type_id ? true : false
                      }
                      label="Select Fuel Type"
                      id="fuel_type_id"
                      options={customOptions(commonOptions?.fuel_types)}
                      onChange={(e) =>
                        handleSelectChange(e, "fuel_type_id", "fuel_type_name")
                      }
                      value={{
                        label: autoCompleteName?.fuel_type_name ? (
                          autoCompleteName?.fuel_type_name
                        ) : (
                          <div className="text-gray-400">Search Fuel Type</div>
                        ),
                        value: autoCompleteName?.fuel_type_id,
                      }}
                      className={
                        formik.errors?.fuel_type_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.fuel_type_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.fuel_type_id}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="drive_trains"
                      className="text-primary font-medium mb-1"
                    >
                      Drive Trains *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.drive_train_id ? true : false
                      }
                      label="Select Drive Train"
                      id="drive_train_id"
                      options={customOptions(commonOptions?.drive_trains)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "drive_train_id",
                          "drive_train_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.drive_train_name ? (
                          autoCompleteName?.drive_train_name
                        ) : (
                          <div className="text-gray-400">
                            Search Drive Train
                          </div>
                        ),
                        value: autoCompleteName?.drive_train_id,
                      }}
                      className={
                        formik.errors?.drive_train_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.drive_train_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.drive_train_id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="vin"
                      className="text-primary font-medium mb-1"
                    >
                      Transmission *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.transmission_id ? true : false
                      }
                      label="Select Transmission"
                      id="transmission_id"
                      options={customOptions(commonOptions?.transmission)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "transmission_id",
                          "transmission_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.transmission_name ? (
                          autoCompleteName?.transmission_name
                        ) : (
                          <div className="text-gray-400">
                            Search Transmissio
                          </div>
                        ),
                        value: autoCompleteName?.transmission_id,
                      }}
                      className={
                        formik.errors?.transmission_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.transmission_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.transmission_id}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="cylinder"
                      className="text-primary font-medium mb-1"
                    >
                      Cylinder *
                    </label>
                    <Select
                      isClearable={autoCompleteName?.cylinder_id ? true : false}
                      label="Select Cylinder"
                      id="cylinder_id"
                      options={customOptions(commonOptions?.cylinders)}
                      onChange={(e) =>
                        handleSelectChange(e, "cylinder_id", "cylinder_name")
                      }
                      value={{
                        label: autoCompleteName?.cylinder_name ? (
                          autoCompleteName?.cylinder_name
                        ) : (
                          <div className="text-gray-400">Search Cylinder</div>
                        ),
                        value: autoCompleteName?.cylinder_id,
                      }}
                      className={
                        formik.errors?.cylinder_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.cylinder_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.cylinder_id}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="vin"
                      className="text-primary font-medium mb-1"
                    >
                      Primary Damage *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.primary_damage_id ? true : false
                      }
                      label="Select Primary Damage"
                      id="primary_damage_id"
                      options={customOptions(commonOptions?.damages)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "primary_damage_id",
                          "primary_damage_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.primary_damage_name ? (
                          autoCompleteName?.primary_damage_name
                        ) : (
                          <div className="text-gray-400">
                            Search Primary Damage
                          </div>
                        ),
                        value: autoCompleteName?.primary_damage_id,
                      }}
                      className={
                        formik.errors?.primary_damage_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.primary_damage_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.primary_damage_id}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="vin"
                      className="text-primary font-medium mb-1"
                    >
                      Secondary Damage *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.secondary_damage_id ? true : false
                      }
                      label="Select Secondary Damage"
                      id="secondary_damage_id"
                      options={customOptions(commonOptions?.damages)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "secondary_damage_id",
                          "secondary_damage_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.secondary_damage_name ? (
                          autoCompleteName?.secondary_damage_name
                        ) : (
                          <div className="text-gray-400">
                            Search Secondary Damage
                          </div>
                        ),
                        value: autoCompleteName?.secondary_damage_id,
                      }}
                      className={
                        formik.errors?.secondary_damage_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.secondary_damage_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.secondary_damage_id}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="odometer"
                      className="text-primary font-medium mb-1"
                    >
                      Odometer *
                    </label>
                    <input
                      id="odometer"
                      type="text"
                      placeholder="Odometer"
                      className={`${
                        formik.errors.odometer
                          ? "border-red-300"
                          : "border-gray-300"
                      } bg-gray-50 border  shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                      onChange={formik.handleChange}
                      value={formik.values.odometer}
                      isTouched={formik.touched.odometer}
                      invalidFeedback={formik.errors.odometer}
                      isValid={formik.isValid}
                    />
                    {formik.errors && formik.errors?.odometer && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.odometer}
                      </p>
                    )}
                  </div>
                  {/* <div className="flex flex-col w-full">
                  <label
                    htmlFor="color"
                    className="text-primary font-medium mb-1"
                  >
                    Color *
                  </label>
                  <input
                    id="color"
                    type="text"
                    placeholder="Color"
                    className={`${
                      formik.errors.color ? "border-red-300" : "border-gray-300"
                    } bg-gray-50 border  shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                    onChange={formik.handleChange}
                    value={formik.values.color}
                    isTouched={formik.touched.color}
                    invalidFeedback={formik.errors.color}
                    isValid={formik.isValid}
                  />
                  {formik.errors && formik.errors?.color && (
                    <p className="text-xs font-semibold text-primary p-1">
                      {formik.errors?.color}
                    </p>
                  )}
                </div> */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="color"
                      className="text-primary font-medium mb-1"
                    >
                      Color *
                    </label>
                    <Select
                      isClearable={autoCompleteName?.color_id ? true : false}
                      label="Select Color"
                      id="color_id"
                      options={customOptions(colorOptions)}
                      onChange={(e) =>
                        handleSelectChange(e, "color_id", "color_name")
                      }
                      value={{
                        label: autoCompleteName?.color_name ? (
                          autoCompleteName?.color_name
                        ) : (
                          <div className="text-gray-400">Search Color</div>
                        ),
                        value: autoCompleteName?.color_id,
                      }}
                      className={
                        formik.errors?.color_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.color_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.color_id}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="mileage_type"
                      className="text-primary font-medium mb-1"
                    >
                      Mileage Type *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.mileage_type_id ? true : false
                      }
                      label="Select Mileage Type"
                      id="mileage_type_id"
                      options={customOptions(commonOptions?.mileage_type)}
                      onChange={(e) =>
                        handleSelectChange(
                          e,
                          "mileage_type_id",
                          "mileage_type_name"
                        )
                      }
                      value={{
                        label: autoCompleteName?.mileage_type_name ? (
                          autoCompleteName?.mileage_type_name
                        ) : (
                          <div className="text-gray-400">
                            Search Mileage Type
                          </div>
                        ),
                        value: autoCompleteName?.mileage_type_id,
                      }}
                      className={
                        formik.errors?.mileage_type_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.mileage_type_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.mileage_type_id}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="highlight"
                      className="text-primary font-medium mb-1"
                    >
                      Keys *
                    </label>

                    <div className="flex justify-left">
                      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute  after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="1"
                          onChange={handleRadioButton}
                          checked={formik.values.keys == 1}
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="inlineRadio1"
                        >
                          Yes
                        </label>
                      </div>

                      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute  after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="2"
                          onChange={handleRadioButton}
                          checked={formik.values.keys == 2}
                        />
                        <label
                          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                          htmlFor="inlineRadio2"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="highlight"
                      className="text-primary font-medium mb-1"
                    >
                      Highlight *
                    </label>
                    <Select
                      isClearable={
                        autoCompleteName?.highlight_id ? true : false
                      }
                      label="Select Highlight"
                      id="highlight_id"
                      options={customOptions(commonOptions?.highlights)}
                      onChange={(e) =>
                        handleSelectChange(e, "highlight_id", "highlight_name")
                      }
                      value={{
                        label: autoCompleteName?.highlight_name ? (
                          autoCompleteName?.highlight_name
                        ) : (
                          <div className="text-gray-400">Search Highlight</div>
                        ),
                        value: autoCompleteName?.highlight_id,
                      }}
                      className={
                        formik.errors?.highlight_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.highlight_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.highlight_id}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="highlight"
                      className="text-primary font-medium mb-1"
                    >
                      Vehicle Category *
                    </label>
                    <Select
                      isClearable={autoCompleteName?.category_id ? true : false}
                      label="Select Category"
                      id="category_id"
                      options={customOptions(commonOptions?.categories)}
                      onChange={(e) =>
                        handleSelectChange(e, "category_id", "category_name")
                      }
                      value={{
                        label: autoCompleteName?.category_name ? (
                          autoCompleteName?.category_name
                        ) : (
                          <div className="text-gray-400">Search Category</div>
                        ),
                        value: autoCompleteName?.category_id,
                      }}
                      className={
                        formik.errors?.category_id
                          ? "border-[1px] rounded-md border-red-500"
                          : ""
                      }
                    />
                    {formik.errors && formik.errors?.category_id && (
                      <p className="text-xs font-semibold text-primary p-1">
                        {formik.errors?.category_id}
                      </p>
                    )}
                  </div>
                </div>

                {formik.values?.category_id == 1 && (
                  <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="vin"
                        className="text-primary font-medium mb-1"
                      >
                        Start Bid Amount *
                      </label>
                      <input
                        id="start_bid_amount"
                        type="text"
                        placeholder="Enter Amount"
                        className={` ${
                          formik.errors.start_bid_amount
                            ? "border-red-300 "
                            : "border-gray-300"
                        } bg-gray-50 border shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                        onChange={formik.handleChange}
                        value={formik.values.start_bid_amount}
                        isTouched={formik.touched.start_bid_amount}
                        invalidFeedback={formik.errors.start_bid_amount}
                        isValid={formik.isValid}
                      />
                      {formik.errors && formik.errors?.start_bid_amount && (
                        <p className="text-xs font-semibold text-primary p-1">
                          {formik.errors?.start_bid_amount}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="sale_type"
                        className="text-primary font-medium mb-1"
                      >
                        Sale Type *
                      </label>
                      <Select
                        isClearable={autoCompleteName?.sale_type ? true : false}
                        label="Select Sale Type"
                        id="sale_type"
                        options={customOptions(commonOptions?.sale_types)}
                        onChange={(e) =>
                          handleSelectChange(e, "sale_type", "sale_type_name")
                        }
                        value={{
                          label: autoCompleteName?.sale_type_name ? (
                            autoCompleteName?.sale_type_name
                          ) : (
                            <div className="text-gray-400">
                              Search Sale Type
                            </div>
                          ),
                          value: autoCompleteName?.sale_type,
                        }}
                        className={
                          formik.errors?.sale_type
                            ? "border-[1px] rounded-md border-red-500"
                            : ""
                        }
                      />
                      {formik.errors && formik.errors?.sale_type && (
                        <p className="text-xs font-semibold text-primary p-1">
                          {formik.errors?.sale_type}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {formik.values?.category_id == 2 && (
                  <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="vin"
                        className="text-primary font-medium mb-1"
                      >
                        Selling Price *
                      </label>
                      <input
                        id="selling_price"
                        type="text"
                        placeholder="Enter Price"
                        className={` ${
                          formik.errors.selling_price
                            ? "border-red-300 "
                            : "border-gray-300"
                        } bg-gray-50 border shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                        onChange={formik.handleChange}
                        value={formik.values.selling_price}
                        isTouched={formik.touched.selling_price}
                        invalidFeedback={formik.errors.selling_price}
                        isValid={formik.isValid}
                      />
                      {formik.errors && formik.errors?.selling_price && (
                        <p className="text-xs font-semibold text-primary p-1">
                          {formik.errors?.selling_price}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {formik.values?.category_id == 1 &&
                  formik.values?.sale_type == 2 && (
                    <div className="grid grid--cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="vin"
                          className="text-primary font-medium mb-1"
                        >
                          Reserve Price *
                        </label>
                        <input
                          id="reserve_amount"
                          type="text"
                          placeholder="Enter Price"
                          className={` ${
                            formik.errors.reserve_amount
                              ? "border-red-300 "
                              : "border-gray-300"
                          } bg-gray-50 border shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
                          onChange={formik.handleChange}
                          value={formik.values.reserve_amount}
                          isTouched={formik.touched.reserve_amount}
                          invalidFeedback={formik.errors.reserve_amount}
                          isValid={formik.isValid}
                        />
                        {formik.errors && formik.errors?.reserve_amount && (
                          <p className="text-xs font-semibold text-primary p-1">
                            {formik.errors?.reserve_amount}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                <FileZone
                  title="Vehicle Photos"
                  url="/api/v1/vehicles-photo-upload"
                  existingFilesArray={
                    editItem?.id ? editItem?.vehicle_images : []
                  }
                  storeSuccess={storeSuccess}
                  setIsImageUploading={setIsImageUploading}
                  removeFile={removeFile}
                  buttonClass="col-4"
                  multiple={true}
                  vcc_document={vccDocument}
                  hintText={
                    "[Note : Image dimensions must be 4:3, max width: 2000, max height: 1500, accept only jpg,jpeg,png]"
                  }
                  storeVcc={storeVcc}
                  vccError={vccError}
                  setVccError={setVccError}
                />

                {fileError && (
                  <p className="text-xs font-semibold text-primary p-1">
                    {fileError}
                  </p>
                )}

                <div className="sticky bottom-0 text-right bg-white py-2">
                  {globalError && (
                    <p className="text-xs font-semibold text-primary p-2 mb-2">
                      {globalError}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="">
                      <div className="flex">
                        <input
                          type="checkbox"
                          checked={formik.values.terms_condition}
                          onChange={handleTermAndCond}
                          value={formik.touched.terms_condition}
                          isTouched={formik.touched.terms_condition}
                          invalidFeedback={formik.errors.terms_condition}
                          isValid={formik.isValid}
                        />
                        <span
                          onClick={() => setTcModal(true)}
                          className="ml-2 text-sm hover:underline cursor-pointer"
                        >
                          Terms & Condition
                        </span>
                      </div>
                      <div className="mt-2">
                        {formik.errors && formik.errors?.terms_condition && (
                          <p className="text-xs font-semibold text-primary">
                            {formik.errors?.terms_condition}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="text-lg font-body bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-80 duration-200"
                      >
                        {editItem?.id ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog open={tcModal} size="md" onClose={tcModalClose}>
        <DialogHeader>
          <div className="w-full flex justify-between rounded-md items-center bg-primary text-white p-2">
            <h4>Terms & Condition</h4>
            <FaTimes
              className="cursor-pointer hover:rotate-90 hover:scale-125 duration-300"
              onClick={tcModalClose}
            />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="max-h-[70vh] p-2">
            {/* <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="all-initial"
            ></div> */}

            <HtmlIframe
              htmlContent={content}
              iframeUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/page-frame/TERMS_AND_CONDITIONS`}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default VehicleModal;
