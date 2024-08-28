'use client';

import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const DashboardModal = ({ setModalOpened }) => {
  const modalBox = useRef(null);
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [remitanceNo, setRemitanceNo] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalBox.current && !modalBox.current.contains(event.target)) {
        setModalOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [setModalOpened]);

  return (
    <div className="absolute z-[99999] h-screen w-screen flex juce items-center inset-0 bg-black bg-opacity-50">
      <div
        className="w-full mx-8 md:mx-auto md:w-[650px] h-auto z-[9999999] shadow-light rounded-xl overflow-hidden bg-white"
        ref={modalBox}
      >
        <div className="flex justify-between items-center gap-2 bg-primary text-white p-4">
          <h4 className="text-lg font-semibold">Top Up your Online Account</h4>
          <FaTimes
            className="cursor-pointer hover:rotate-90 hover:scale-125 duration-300"
            onClick={() => setModalOpened(false)}
          />
        </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <h4 className="text-lg font-medium">Top-up by Debit/Credit Card</h4>
          <button className="flex justify-center items-center py-2 px-7 rounded-full bg-primary text-white font-bold">
            Pay
          </button>
        </div>

        <hr />

        <div className="py-6 px-4 md:px-8">
          <h4 className="text-xl text-center font-medium mb-4">
            Upload Bank Remittance Receipt
          </h4>
          <form action="" className="flex flex-col gap-4">
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
                  className="input-with-shadow !py-4"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
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
                  placeholder="Billing Amount"
                  className="input-with-shadow !py-4"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* remitance no */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="remitance-no"
                  className="text-primary font-medium mb-1"
                >
                  Remitance No*
                </label>
                <input
                  name="remitance-no"
                  type="text"
                  placeholder="Remitance No"
                  className="input-with-shadow !py-4"
                  value={remitanceNo}
                  onChange={(e) => setRemitanceNo(e.target.value)}
                />
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
                  className="input-with-shadow !py-4"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
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
                value={uploadedFile}
                onChange={(e) => setUploadedFile(e.target.value[0])}
              />
            </div>

            <p className="text-[12px]">
              <span className="text-primary font-bold">***</span>
              All Fields are mandatory to send your request
            </p>

            <div>
              <button className="text-lg font-body bg-primary text-white px-12 py-2.5 rounded-full hover:bg-opacity-90">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
