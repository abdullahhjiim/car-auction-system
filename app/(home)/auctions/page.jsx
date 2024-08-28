import AuctionNowLater from "@/components/auction/AuctionNowLater";
import banner2 from "@/public/banner2.png";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
  title: "GCA | Auction List",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const Auctions = () => {
  return (
    <>
      <div>
        <div className="relative flex justify-center items-center py-12 min-h-[30vh]  z-1">
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 -z-[1]" />
          <div className="absolute inset-0 w-full h-full -z-[2]">
            <Image
              src={banner2}
              alt="banner"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="container mx-auto px-4">
            <h4 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center z-1">
              Auction List
            </h4>
          </div>
        </div>
        <div className="bg-secondary bg-opacity-30 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="p-2 mb-3">
              <p className="text-left">
                Explore the excitement of our dynamic Auction List at Gulf Cars
                Auction, where a diverse range of quality vehicles awaits your
                bids. Our concrete Auction List is your gateway to an exclusive
                selection of automobiles, each meticulously inspected and ready
                to redefine your driving experience.
              </p>
            </div>
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <AuctionNowLater />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auctions;
