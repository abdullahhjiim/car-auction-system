"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import VehicleModal from "./modal/VehicleModal";
import { authAxios } from "/app/(home)/axious-config";

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
    title: "Max Bid",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

const CarApprovalTable = ({
  name,
  tableBodyData,
  token,
  handleSearch,
  dataLoading,
  totalVehicle,
}) => {
  const [toastObj, setToastObj] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (toastObj && toastObj?.showMessage && toastObj?.message) {
      toast(toastObj?.message ?? "", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setToastObj(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastObj, toastObj?.showMessage]);

  const handleEdit = (vehicleId) => {
    setLoading(true);
    authAxios
      .get(`/member-vehicles/${vehicleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEditItem(res?.data?.data);
        setLoading(false);
        setModalOpened(true);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteConfirm = (vehicleID) => {
    authAxios
      .delete(`/member-vehicles/${vehicleID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLoading(false);

        setToastObj({
          showMessage: true,
          message: res?.data?.message ?? "Successfully Delete Data",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setToastObj({
          showMessage: true,
          message: err?.response?.data?.message ?? "Something went wrong",
        });
      });
  };

  const approveConfirm = (item, type) => {
    let formData = new FormData();

    formData.append("auction_id", item.auction_id);
    formData.append("vehicle_id", item.id);
    if (type == "Approve") {
      formData.append("status", 15);
    }
    if (type == "Reject") {
      formData.append("status", 20);
    }

    authAxios
      .post(`/auction-vehicle/approve`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLoading(false);

        setToastObj({
          showMessage: true,
          message: res?.data?.message ?? `Successfully ${type}`,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setToastObj({
          showMessage: true,
          message: err?.response?.data?.message ?? "Something went wrong",
        });
      });
  };

  const showSwal = (vehicleID) => {
    withReactContent(Swal)
      .fire({
        title: "Do you want to Delete?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        confirmButtonColor: "#B20A0B",
        denyButtonColor: "#888489",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteConfirm(vehicleID);
        }
      });
  };

  const showSwalApprove = (item, type) => {
    withReactContent(Swal)
      .fire({
        title: `Do you want to ${type}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        confirmButtonColor: "#B20A0B",
        denyButtonColor: "#888489",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          approveConfirm(item, type);
        }
      });
  };

  const handleDelete = (vehicleID) => {
    showSwal(vehicleID);
  };

  const handleView = (vehicleID) => {
    router.push(`/admin/sell-my-car/approval-car/${vehicleID}`);
  };

  const submitSearch = () => {
    handleSearch(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleApproveReject = (item, type) => {
    showSwalApprove(item, type);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h5 className="text-2xl md:text-3xl font-bold">{name}</h5>
        <div>
          {/* <button
            onClick={() => setModalOpened(true)}
            className="bg-primary py-2 px-3  rounded-md text-white hover:opacity-70 duration-200"
          >
            {" "}
            + New Vehicle
          </button> */}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className=" text-xl font-semibold">{totalVehicle}</div>
        <div className="relative mt-5 mb-8 max-w-56">
          <div className="">
            <input
              type="text"
              className="h-12 shadow-light rounded-md text-sm p-3 pr-11 !w-full"
              placeholder="Search by Vin or Lot"
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
                  <td className="px-6 py-4 text-center">
                    <Image
                      src={item?.thumbnail_url}
                      alt="vehicle"
                      width={100}
                      height={100}
                      className="max-w-[100px] h-auto object-cover rounded-md"
                    />
                  </td>

                  <td className="px-6 py-4">{item?.vin}</td>
                  <td className="px-6 py-4">{item?.title}</td>
                  <td className="px-6 py-4">{item?.selling_price}</td>
                  <td className="px-6 py-4">{item?.status_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(item?.id)}
                        disabled={loading}
                        className="p-2 text-white rounded-md bg-primary hover:bg-opacity-60 duration-200"
                      >
                        View
                      </button>

                      {(item?.status == 0 || item?.status == 50) && (
                        <>
                          <button
                            onClick={() => handleEdit(item?.id)}
                            disabled={loading}
                            className="p-2 text-white rounded-md bg-primary hover:bg-opacity-60 duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item?.id)}
                            disabled={loading}
                            className="p-2 text-white rounded-md bg-primary hover:bg-opacity-60 duration-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {item?.status == 12 && (
                        <>
                          <button
                            onClick={() => handleApproveReject(item, "Approve")}
                            className="bg-primary p-2 rounded-md text-white hover:bg-opacity-60 duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveReject(item, "Reject")}
                            className="bg-primary p-2 rounded-md text-white hover:bg-opacity-60 duration-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <VehicleModal
        editItem={editItem}
        setModalOpened={setModalOpened}
        setEditItem={setEditItem}
        setToastObj={setToastObj}
        toastObj={toastObj}
        modal={modalOpened}
        closeModal={setModalOpened}
      />
    </div>
  );
};

export default CarApprovalTable;
