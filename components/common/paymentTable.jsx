"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const tableHeadData = [
  {
    title: "Bank Name",
  },
  {
    title: "Amount",
  },
  {
    title: "Payment Date",
  },
  {
    title: "Reference Number",
  },
  {
    title: "Status",
  },
  //   {
  //     title: "Attachment",
  //   },
];

const PaymentTable = ({ name, tableBodyData, dataLoading, handleSearch }) => {
  const [searchText, setSearchText] = useState("");

  const submitSearch = () => {
    handleSearch(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h5 className="text-2xl md:text-3xl font-bold">{name}</h5>
        <div></div>
      </div>
      <div className="flex justify-between items-center">
        <div></div>
        <div className="relative mt-5 mb-8 max-w-56">
          <div className="">
            <input
              type="text"
              className="h-12 shadow-light rounded-md text-sm p-3 pr-11 !w-full"
              placeholder="Global Search.."
              value={searchText}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <FaSearch
              onClick={submitSearch}
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-light sm:rounded-lg">
        {dataLoading && <p className="">Loading..</p>}
        {!dataLoading && tableHeadData && tableBodyData && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {tableHeadData?.map((item, i) => (
                  <th scope="col" className="px-6 py-3 min-w-[120px]" key={i}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tableBodyData?.length == 0 && (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan={9}>
                    No record found
                  </td>
                </tr>
              )}
              {tableBodyData.map((item, i) => (
                <tr
                  className="odd:bg-white even:bg-orange-50 !bg-opacity-50 border-b"
                  key={i}
                >
                  <td className="px-6 py-4">{item?.bank_name}</td>
                  <td className="px-6 py-4">{item?.amount}</td>
                  <td className="px-6 py-4">{item?.payment_date}</td>
                  <td className="px-6 py-4">{item?.reference_number}</td>
                  <td className="px-6 py-4">{item?.status_name}</td>

                  {/* <td className="px-6 py-4 text-center">
                    <Image
                      src={item?.attachment}
                      alt="vehicle"
                      width={100}
                      height={100}
                      className="max-w-[100px] h-auto object-cover rounded-md"
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
