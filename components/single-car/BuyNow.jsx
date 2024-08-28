"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoginModal from "../login/login";
import { authAxios } from "/app/(home)/axious-config";

const BuyNow = ({ vehicle }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError(null);

    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("price", vehicle.selling_price);

    try {
      const response = await authAxios.post(
        `/vehicles/${vehicle.id}/buy-now`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response?.data?.success) {
        toast(response?.data?.message ?? "Successfully purchaed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setSubmitLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setSubmitLoading(false);
      setError(err?.response?.data?.message);
    }
  };

  const showSwal = () => {
    withReactContent(Swal)
      .fire({
        title: "Do you want to Buy?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        confirmButtonColor: "#B20A0B",
        denyButtonColor: "gray",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleSubmit();
        }
      });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setModal(true);
    } else {
      showSwal();
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  return (
    <div className="border border-primary rounded overflow-hidden mb-2">
      <div className="bg-primary text-white rounded p-3">
        <h4 className="text-lg font-semibold">Buy Now Vehicle</h4>
      </div>

      <div className="p-3">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-xl font-semibold">
            Buy Now Price : AED {vehicle?.selling_price}
          </h1>
          {error && (
            <p className="text-center text-red-500 font-semibold ">{error}</p>
          )}
          <button
            onClick={handleBuyNow}
            disabled={submitLoading}
            className="bg-primary text-white px-2 py-1 rounded-md hover:bg-opacity-70 duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default BuyNow;
