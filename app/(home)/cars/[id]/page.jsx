/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import CarImage from "@/components/cars/CarImage";
import LoginModal from "@/components/login/login";
import AuctionRelatedCars from "@/components/single-car/AuctionRelatedCars";
import BidInformations from "@/components/single-car/BidInformations";
import BuyNow from "@/components/single-car/BuyNow";
import ContactMore from "@/components/single-car/ContactMore";
import RelatedCars from "@/components/single-car/RelatedCars";
import SaleInfo from "@/components/single-car/SaleInfo";
import VehicleInformation from "@/components/single-car/VehicleInformation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";
import { handleWatch } from "/app/(home)/utils/setWatchUnWatch";

const page = ({ params }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { id } = params;

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/lot-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const _data = res.data?.data;
        setData(_data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchUnwatchSet = (vehicleID, watch) => {
    if (token) {
      handleWatch(vehicleID, watch, token);
    } else {
      setModal(true);
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className="my-12">
        {loading && <p>Loading...</p>}
        {!loading && data && (
          <div className="container mx-auto px-4">
            {/* heading */}
            <div className="flex justify-between items-center gap-4">
              <div>
                <h4 className="text-2xl md:text-4xl font-bold">
                  {data?.title}
                </h4>
                <p className="mt-3 text-[12px]">
                  Lot #{" "}
                  <span className="text-primary font-semibold">
                    {data?.lot_number}
                  </span>{" "}
                  | Sale Location: <span>{data?.auction_yard_name}</span> | Sale
                  Date: <span>{data?.sale_time}</span>
                </p>
              </div>

              <div>
                {/* <button className="border border-primary text-primary hover:text-white hover:bg-primary duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1">
                  <FaStar />
                  Watch
                </button> 
                <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-light flex justify-center items-center cursor-pointer text-primary hover:bg-primary hover:text-white duration-300"
                    onClick={() => watchUnwatchSet(item?.id, item?.is_watched)}
                  >
                    {item?.is_watched ? <FaHeart /> : <FaRegHeart />}

                    absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-light flex justify-center items-center cursor-pointer text-primary hover:bg-primary hover:text-white duration-300
                  </div>
                
                */}
                {data?.is_watched ? (
                  <button
                    onClick={() => watchUnwatchSet(data?.id, data?.is_watched)}
                    className="border border-yellow-800 text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
                  >
                    <FaHeart />
                  </button>
                ) : (
                  <button
                    onClick={() => watchUnwatchSet(data?.id, data?.is_watched)}
                    className="border border-yellow-800 text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
                  >
                    <FaRegHeart />
                  </button>
                )}
              </div>
            </div>

            {/* main box */}
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8 max-w-full overflow-hidden mt-12">
              <div className="w-full lg:w-[45%]">
                <CarImage images={data?.vehicle_images} />
              </div>
              <div className="w-full lg:w-[30%]">
                <VehicleInformation vehicle={data} />
              </div>
              <div className="w-full lg:w-[25%]">
                {data?.auction_status === 5 && data?.auction_type == 2 && (
                  <BidInformations vehicle={data} />
                )}
                {(data?.vehicle_status == 1 || data?.vehicle_status == 5) &&
                  data?.category_id == 2 && <BuyNow vehicle={data} />}
                {data?.category_id == 1 && <SaleInfo vehicle={data} />}

                <ContactMore vehicle={data} />
              </div>
            </div>

            {(data?.auction_status === 5 || data?.auction_status === 7) && (
              <AuctionRelatedCars
                url={`/lot/${data?.lot_number}/auction-vehicles`}
              />
            )}

            {/* related cars */}
            <div>
              <RelatedCars url={`/lot/${data?.lot_number}/similar-vehicles`} />
            </div>
          </div>
        )}
      </div>
      <LoginModal modal={modal} setModalClose={setModalClose} />
    </>
  );
};

export default page;
