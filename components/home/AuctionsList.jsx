import carShape from "@/public/car-shape.png";
import lineAbstract from "@/public/line-abstract.png";
import Image from "next/image";
import { Suspense } from "react";
import BrandLoader from "../home/BrandLoader";
import UpcomingAuctions from "./UpcomingAuctions";

const AuctionsList = () => {
  return (
    <div className="bg-white py-20">
      <div className="container px-4 mx-auto">
        <div className="relative text-center">
          <div className="absolute -top-[50%] md:-top-[130%] left-1/2 -translate-x-1/2">
            <Image src={carShape} alt="car" />
          </div>
          <h4 className="text-2xl md:text-4xl xl:text-5xl font-bold mb-6">
            Upcoming Auctions
          </h4>
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center mb-10">
            <Image src={lineAbstract} alt="line" />
          </div>

          <Suspense
            fallback={
              <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 items-center">
                <BrandLoader />
                <BrandLoader />
                <BrandLoader />
                <BrandLoader />
                <BrandLoader />
                <BrandLoader />
              </div>
            }
          >
            <UpcomingAuctions />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuctionsList;
