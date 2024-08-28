"use client";

import Image from "next/image";
import { useState } from "react";

const tableHeadData = [
  {
    title: "Image",
  },
  {
    title: "VIN",
  },
  {
    title: "Title",
  },
  {
    title: "My Max Bid",
  },
  {
    title: "Current Bid",
  },
  {
    title: "Auction Yard",
  },
  {
    title: "Status",
  },
];

const MyBidsTable = ({
  name,
  tableBodyData,
  token,
  setDaysRange,
}) => {
  const [searchedText, setSearchedText] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);


  return (
    <div>
      <div className="flex justify-between">
        <h5 className="text-2xl md:text-3xl font-bold">{name}</h5>
        <div>
          <select
            className="border-2 border-gray-500 p-1 rounded-md"
            name="date_range"
            id=""
            onChange={setDaysRange}
          >
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_60_days">Last 60 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_180_days">Last 180 Days</option>
          </select>
        </div>
      </div>
      {/* <div className="relative mt-5 mb-8 max-w-56">
        <input
          type="text"
          className="h-12 shadow-light rounded-md text-sm p-3 pr-11 !w-full"
          placeholder="Search..."
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
        <FaSearch className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" />
      </div> */}

      <div className="relative mt-4 overflow-x-auto shadow-light sm:rounded-lg">
        {tableHeadData && tableBodyData ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {tableHeadData?.map((item, i) => (
                  <th
                    scope="col"
                    className="px-6 py-3 min-w-[120px] text-center"
                    key={i}
                  >
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
                  <td className="px-6 py-4 text-center">
                    <Image
                      src={item?.thumbnail_url}
                      alt="vehicle"
                      width={100}
                      height={100}
                      className="max-w-[100px] h-auto object-cover rounded-md"
                    />
                  </td>

                  <td className="px-6 py-4 text-center">{item?.vin}</td>
                  <td className="px-6 py-4 text-center">{item?.title}</td>
                  <td className="px-6 py-4 text-center">
                    {item?.my_max_bid}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item?.current_bid_amount}
                  </td>
                  <td className="px-6 py-4 text-center">{item?.auction_yard_name}</td>
                  <td className="px-6 py-4 text-center">{item?.bid_status_name}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-8 px-4">No {name} Found</p>
        )}
      </div>
      
    </div>
  );
};

export default MyBidsTable;
