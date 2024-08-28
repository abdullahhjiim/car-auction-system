"use client";
import { authAxios } from "@/app/(home)/axious-config";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const MarqueSection = () => {
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

  if (data?.length == 0) {
    return;
  }

  return (
    <div className="container flex">
      <Marquee>
        {data
          .map((item) => {
            return ` ${item.auction_yard_name} auction at ${item.auction_at_formatted}. Total Vehicles: ${item.total_vehicles} `;
          })
          .join(" | ")}{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Marquee>
      <Link
        href={"/auctions"}
        className=" w-40 bg-primary text-white py-3 px-8 transform -skew-x-12 hover:skew-x-0 transition duration-300 ease-in-out"
      >
        Join Now
      </Link>
    </div>
  );
};

export default MarqueSection;
