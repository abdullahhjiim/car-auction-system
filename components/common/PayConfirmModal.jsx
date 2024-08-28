import { authAxios } from "@/app/(home)/axious-config";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PayConfirmModal = ({ isOpen, setIsOpen, totalAmount, invoiceIds }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = () => {
    try {
      let postUrl = "/invoice-payments";
      // api call
      setLoading(true);
      authAxios
        .post(
          postUrl,
          {
            invoice_ids: invoiceIds,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res?.status == 200) {
            toast(res?.data?.message ?? "Successfully Submit Payment", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((error) => {
          if (error?.response?.status == 400) {
            toast(error?.response?.data?.message ?? "Failed Payment", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (error?.response?.status == 422) {
            toast(error?.response?.data?.message ?? "Failed Payment", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } catch (error) {
      setError(error?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} size="xs">
      <DialogBody>
        <div className="flex min-h-full flex-col justify-center py-2 -mt-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <p className="text-center">{error}</p>}
            <h2 className="mt-6 text-center text-3xl leading-9 tracking-tight text-gray-900">
              Total Amount : {totalAmount}
            </h2>
            <p className="text-center p-4 text-lg tracking-wide">
              Please confirm if you want to Payment.
            </p>
            <div className="flex justify-center items-center gap-x-3 w-full mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-900 px-4 py-1 rounded-md text-white font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleConfirm}
                className="bg-primary px-4 py-1 rounded-md text-white font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PayConfirmModal;
