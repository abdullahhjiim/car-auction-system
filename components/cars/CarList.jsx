import sale from "@/public/sale.png";
import upcoming from "@/public/upcoming.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import LoginModal from "../login/login";
import CarLoading from "./CarLoading";
import { authAxios } from "/app/(home)/axious-config";

const CarList = ({ isGrid, lotData, loading, token }) => {
  const [modal, setModal] = useState(false);
  const [inWishList, setInWishList] = useState(null);

  const watchUnwatchSet = (vehicleID, watch) => {
    if (token) {
      // setInWishList({id: vehicleID, watch : watch});
      // handleWatch(vehicleID, watch, token);
      let finalWatch = watch;
      if (inWishList && inWishList[vehicleID]) {
        finalWatch = inWishList[vehicleID]?.watched;
      }

      authAxios
        .post(
          `/vehicles/${vehicleID}/toggle-watch`,
          { watched: !finalWatch },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res?.data?.success) {
            // window.location.reload();

            setInWishList({
              ...inWishList,
              [vehicleID]: { watched: !finalWatch },
            });
          }
        })
        .catch((err) => {
          if (err?.response?.status == 400) {
            toast.info(
              err?.response?.data?.message ?? "You can not take this action",
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              }
            );
          }
        });
    } else {
      setModal(true);
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  const inWishListCheck = (id, isWish) => {
    if (inWishList && inWishList[id]) {
      return inWishList[id].watched;
    } else {
      return isWish;
    }
  };

  return (
    <div
      className={`${
        isGrid
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          : "flex flex-col gap-y-4"
      } `}
    >
      {loading && <CarLoading />}
      {!loading &&
        lotData.map((item, i) => {
          const {
            title,
            start_bid_amount,
            is_upcoming,
            remaining_time,
            thumbnail_url,
          } = item;

          return (
            <div
              className={`${
                isGrid ? "grid col-span-1" : "grid grid-cols-8 gap-x-4"
              }  bg-[#eff1f3] shadow-light rounded-lg  overflow-hidden`}
              key={i}
            >
              <div
                className={`relative ${
                  isGrid ? "col-span-1" : "col-span-8 sm:col-span-3 sm:order-2"
                }`}
              >
                {is_upcoming ? (
                  <Image
                    src={upcoming}
                    alt="badge"
                    className={`z-10 absolute top-0 max-w-[80px] ${
                      isGrid ? "left-0" : "sm:-left-6"
                    } `}
                  />
                ) : (
                  <Image
                    src={sale}
                    alt="badge"
                    className={`z-10 absolute top-0 max-w-[100px] ${
                      isGrid ? "left-0" : "sm:-left-6"
                    } `}
                  />
                )}

                <div className="relative overflow-hidden h-[240px]">
                  <Image
                    src={thumbnail_url}
                    alt="car"
                    className="hover:scale-110 transition duration-500 rounded-lg h-full w-full object-cover"
                    height={100}
                    width={200}
                  />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-light flex justify-center items-center cursor-pointer text-primary hover:bg-primary hover:text-white duration-300"
                    onClick={() => watchUnwatchSet(item?.id, item?.is_watched)}
                  >
                    {inWishListCheck(item.id, item?.is_watched) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`relative ${
                  isGrid
                    ? "col-span-1"
                    : "col-span-8 sm:col-span-5 order-2 sm:order-1"
                }`}
              >
                <div className="p-4 pb-5">
                  <div
                    className={`${
                      isGrid ? "flex-col" : "flex-row"
                    } flex justify-between items-start gap-x-2 mb-2`}
                  >
                    <h2 className="text-xl font-semibold truncate">{title}</h2>
                  </div>

                  <div className="mt-1">
                    <div
                      className={`grid ${
                        isGrid
                          ? "grid-cols-1 gap-1"
                          : "grid-cols-2 gap-x-4 gap-y-1.5"
                      }`}
                    >
                      {item?.category_id == 1 ? (
                        <>
                          <h2 className="text-primary opacity-90 font-semibold">
                            Starting Bid:{" "}
                            <span className="text-[18px]">
                              AED {item.start_bid_amount}
                            </span>
                          </h2>
                        </>
                      ) : (
                        <>
                          <h2 className="text-primary opacity-90 font-semibold">
                            Price:{" "}
                            <span className="text-[18px]">
                              AED {item.selling_price}
                            </span>
                          </h2>
                        </>
                      )}

                      <h2 className="text-sm opacity-90">
                        {remaining_time && (
                          <h2 className="font-semibold">{remaining_time}</h2>
                        )}
                      </h2>

                      <h2 className="text-sm opacity-90">
                        Location: {item.sale_name}
                      </h2>
                      <h2 className="text-sm opacity-90">
                        LOT: {item.lot_number}
                      </h2>
                      <h2 className="text-sm opacity-90">
                        Odometer: {item.odometer}
                      </h2>
                      <h2 className="text-sm opacity-90">VIN: {item.vin}</h2>
                      <h2 className="text-sm opacity-90">Keys: {item.keys}</h2>
                      <h2 className="text-sm opacity-90">
                        Damage: {item.primary_damage}
                      </h2>
                      <h2 className="text-sm opacity-90">
                        Color: {item.color}
                      </h2>
                      <h2 className="text-sm opacity-90">
                        Engine Type: {item.engine_type}
                      </h2>
                    </div>
                    <div className="col-span-1 w-full flex justify-end mt-2">
                      {/* {item?.is_watched ? (
                        <button
                          onClick={() =>
                            watchUnwatchSet(item?.id, item?.is_watched)
                          }
                          className="border border-yellow-800 text-yellow-800 hover:text-white hover:bg-yellow-400 duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
                        >
                          <FaStar />
                          <span>Unwatch</span>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            watchUnwatchSet(item?.id, item?.is_watched)
                          }
                          className="border border-white mr-1 text-white hover:text-white hover:bg-primary duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
                        >
                          <FaStar />
                          <span>Watch</span>
                        </button>
                      )} */}

                      {item.auction_status == 5 && item?.auction_type == 2 && (
                        <Link
                          href={`/all-vehicle/${item.lot_number}`}
                          target="_blank"
                        >
                          <button className="text-white bg-primary rounded-md font-bold py-2 px-4 w-30 hover:bg-opacity-95 mr-2">
                            Prebid
                          </button>
                        </Link>
                      )}

                      <Link
                        href={`/all-vehicle/${item.lot_number}`}
                        target="_blank"
                      >
                        <button className="text-white bg-primary rounded-md font-bold py-2 px-4 w-30 hover:bg-opacity-95">
                          View Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default CarList;
