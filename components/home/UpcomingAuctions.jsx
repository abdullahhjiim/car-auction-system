"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { authAxios } from "/app/(home)/axious-config";

const UpcomingAuctions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    authAxios
      .get("/upcoming-auctions?limit=4")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totalItem = data?.length;

  return (
    <>
      {totalItem === 0 && <p>No upcoming auction</p>}

      <div className="flex justify-center items-center gap-2 mb-2 flex-wrap">
        {totalItem > 0 &&
          data.map((auction, i) => {
            return (
              <div key={i} className="relative z-10 w-[320px] overflow-hidden">
                <Link
                  href={`/auction-vehicle?auction_id=${auction.id}`}
                  key={i}
                >
                  <div className="relative isolate flex flex-col justify-end overflow-hidden border-2 border-gray-100 shadow-2xl rounded-md px-8 pb-8 pt-20 min-h-60">
                    <Image
                      fill
                      src={auction?.auction_yard_banner ?? ""}
                      alt="auction yard image"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute top-0 left-0 z-[100] text-primary bg-[#f5f5f5] w-full p-2 flex items-center justify-center">
                      <p className="text-lg uppercase font-bold text-center ">
                        {auction?.auction_yard_name}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 z-[100] bg-primary text-white w-full p-2 flex items-center justify-between">
                      <p className="text-sm uppercase font-bold">
                        {auction?.auction_at}
                      </p>
                      <p className="text-sm uppercase font-bold bg-white px-2 py-1 rounded text-primary">
                        {auction?.total_vehicles} Vehicles
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UpcomingAuctions;
