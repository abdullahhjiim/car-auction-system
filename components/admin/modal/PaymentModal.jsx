'use client';

import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PaymentModal = ({ setModalOpened, modalInfo }) => {
  const modalBox = useRef(null);
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [remitanceNo, setRemitanceNo] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalBox.current && !modalBox.current.contains(event.target)) {
        setModalOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [setModalOpened]);

  const fileCheck = (type) => {
    return ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].includes(
      type
    );
  };

  const handleFiles = async (e) => {
    const inputFiles = e.target.files;

    setFileError('');
    setError({
      ...error,
      attachment: '',
    });

    if (fileCheck(inputFiles[0].type)) {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append('file', inputFiles[0]);
      try {
        const response = await authAxios.post(
          '/payment-receipts/upload-attachment',
          formData
        );

        if (response?.data?.success) {
          setUploadedFile(response?.data?.url);

          let errors = { ...error, file: '' };
          setError(errors);
          setSubmitLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (err?.response?.status == 422) {
          setError({
            ...error,
            attachment: err?.response?.data?.errors?.file[0],
          });
        }
        setSubmitLoading(false);
      }
    } else {
      e.target.value = '';
      setFileError('File format is not Valid');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setSubmitLoading(true);
    const formData = new FormData();
    formData.append('bank_name', bankName);
    formData.append('reference_number', remitanceNo);
    formData.append('amount', amount);
    formData.append('payment_date', paymentDate);
    formData.append('attachment', uploadedFile);
    formData.append('type', modalInfo?.type);

    try {
      const response = await authAxios.post('/payment-receipts', formData);
      if (response?.data?.success) {
        toast(response?.data?.message ?? 'Payment Submit Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setSubmitLoading(false);
        setModalOpened(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status == 422) {
        let errs = err?.response?.data?.errors;
        let errorList = {};
        Object.keys(errs).map((keyItem) => {
          errorList[keyItem] = errs[keyItem][0];
        });
        setError(errorList);
      }
      setSubmitLoading(false);
    }
  };

  return (
    <div className="absolute z-[99999] h-screen w-screen flex juce items-center inset-0 bg-black bg-opacity-50">
      <div
        className="w-full mx-8 md:mx-auto md:w-[650px] h-auto z-[9999999] shadow-light rounded-xl overflow-hidden bg-white"
        ref={modalBox}
      >
        <div className="flex justify-between items-center gap-2 bg-primary text-white p-4">
          <h4 className="text-lg font-semibold">{modalInfo?.title}</h4>
          <FaTimes
            className="cursor-pointer hover:rotate-90 hover:scale-125 duration-300"
            onClick={() => setModalOpened(false)}
          />
        </div>
        {/* <div className="flex justify-between items-center gap-2 p-4">
          <h4 className="text-lg font-medium">Top-up by Debit/Credit Card</h4>
          <button className="flex justify-center items-center py-2 px-7 rounded-full bg-primary text-white font-bold">
            Pay
          </button>
        </div> */}

        {/* <hr /> */}

        <div className="py-6 px-4 md:px-8">
          <h4 className="text-xl text-center font-medium mb-4">
            Upload Bank Remittance Receipt
          </h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* bank name */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="bank-name"
                  className="text-primary font-medium mb-1"
                >
                  Bank Name*
                </label>
                <input
                  type="text"
                  name="bank-name"
                  placeholder="Bank Name"
                  required
                  className="input-with-shadow !py-2"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
                {error && (
                  <p className="text-sm font-semibold text-primary">
                    {error['bank_name']}
                  </p>
                )}
              </div>
              {/* amount */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="amount"
                  className="text-primary font-medium mb-1"
                >
                  Amount*
                </label>
                <input
                  name="amount"
                  type="number"
                  required
                  placeholder="Billing Amount"
                  className="input-with-shadow !py-2"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {error && (
                  <p className="text-sm font-semibold text-primary">
                    {error['amount']}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* remitance no */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="remitance-no"
                  className="text-primary font-medium mb-1"
                >
                  Remittance No*
                </label>
                <input
                  name="remitance-no"
                  type="text"
                  required
                  placeholder="Remitance No"
                  className="input-with-shadow !py-2"
                  value={remitanceNo}
                  onChange={(e) => setRemitanceNo(e.target.value)}
                />
                {error && (
                  <p className="text-sm font-semibold text-primary">
                    {error['reference_number']}
                  </p>
                )}
              </div>
              {/* payment date */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="payment-date"
                  className="text-primary font-medium mb-1"
                >
                  Payment Date*
                </label>
                <input
                  type="date"
                  name="payment-date"
                  required
                  className="input-with-shadow !py-2"
                  value={paymentDate}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
                {error && (
                  <p className="text-sm font-semibold text-primary">
                    {error['payment_date']}
                  </p>
                )}
              </div>
            </div>

            {/* uploaded file */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="receipt"
                className="text-primary font-medium mb-1"
              >
                Upload Receipt*
              </label>
              <input
                type="file"
                name="receipt"
                accept="image/jpg,image/png,image/jpeg,application/pdf"
                required
                onChange={handleFiles}
              />
              {error && (
                <p className="text-sm font-semibold text-primary">
                  {error['attachment']}
                </p>
              )}
              {fileError && (
                <p className="text-sm font-semibold text-primary">
                  {fileError}
                </p>
              )}
            </div>

            <p className="text-[12px]">
              <span className="text-primary font-bold">***</span>
              All Fields are mandatory to send your request
            </p>

            <div className="text-right">
              <button
                type="submit"
                disabled={submitLoading}
                className="text-lg font-body bg-primary text-white px-8 py-2.5 rounded-full hover:bg-opacity-70 duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
