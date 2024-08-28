import DownloadCom from "@/components/extra/DownloadCom";
import banner from "@/public/banner1.png";
import Image from "next/image";
import { Suspense } from "react";

export const metadata = {
  title: "Gulf Cars Auction | Downloads",
  description: "Gulf Cars Auction | Salvage Car Auction Sharjah",
};

const Downloads = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative flex justify-center items-center py-12 min-h-[25vh] z-1 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 -z-[1]" />
        <div className="absolute inset-0 w-full h-full -z-[2]">
          <Image
            src={banner}
            alt="banner"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="container mx-auto px-4">
          <h4 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
            Downloads
          </h4>
        </div>
      </div>
      <Suspense fallback={"Loading..."}>
        <DownloadCom />
      </Suspense>
    </div>
  );
};

export default Downloads;
