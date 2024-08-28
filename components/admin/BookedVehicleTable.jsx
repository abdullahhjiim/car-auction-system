"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import VehicleModal from "./modal/VehicleModal";

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
    title: "Lot Number",
  },
  {
    title: "Purchase Price",
  },
  {
    title: "Action",
  },
];

const BookedVehicleTable = ({ name, loading, tableBodyData, handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const handleView = (vehicleID) => {
    router.push(`/all-vehicle/${vehicleID}`);
  };

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
      <div className="mb-4 flex justify-between items-center">
        <h5 className="text-2xl md:text-3xl font-bold">{name}</h5>
        <div className="relative max-w-70">
          <input
            type="text"
            className="h-12 shadow-light rounded-md text-sm p-3 pr-11 !w-full"
            placeholder="Search By Vin or Lot"
            value={searchText}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch
            onClick={submitSearch}
            className="text-primary absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          />
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto shadow-light sm:rounded-lg">
        {loading && <p className="py-8 px-4">Loading...</p>}
        {!loading && tableHeadData && tableBodyData && (
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
                      className="max-w-[100px] h-auto object-cover rounded-md  lazy-loading"
                    />
                  </td>

                  <td className="px-6 py-4 text-center">{item?.vin}</td>
                  <td className="px-6 py-4 text-center">{item?.title}</td>

                  <td className="px-6 py-4 text-center">{item?.lot_number}</td>
                  <td className="px-6 py-4 text-center">
                    {item?.selling_price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        onClick={() => handleView(item?.lot_number)}
                        disabled={loading}
                        className="px-2 py-1 text-white rounded-md bg-primary hover:bg-opacity-60 duration-200"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modalOpened && (
        <VehicleModal
          editItem={editItem}
          setModalOpened={setModalOpened}
          setEditItem={setEditItem}
        />
      )}
    </div>
  );
};

export default BookedVehicleTable;
