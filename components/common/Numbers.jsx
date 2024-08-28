import banner from "@/public/banner3.png";
import Image from "next/image";
import { Suspense } from "react";
import NumberData from "./NumberData";

const Numbers = () => {
  return (
    <div className="relative flex justify-center items-center py-12 min-h-[44vh] z-10">
      <div className="absolute inset-0 w-full h-full bg-primary bg-opacity-80 -z-[1]" />
      <div className="absolute inset-0 w-full h-full -z-[2]">
        <Image
          src={banner}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <NumberData />
      </Suspense>
    </div>
  );
};

export default Numbers;
