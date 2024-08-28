import FaqAccordion from "@/components/extra/FaqAccordion";
import banner from "@/public/banner1.png";
import Image from "next/image";

export const metadata = {
  title: "Gulf Cars Auction | Frequently Asked Questions",
  description: "Gulf Cars Auction | Salvage Car Auction Sharjah",
};

const AboutUs = () => {
  return (
    <>
      <div>
        <div className="relative flex justify-center items-center py-24 min-h-[20vh] sm:min-h-[20vh] z-1 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 -z-[1]" />
          <div className="absolute inset-0 w-full h-full -z-[2]">
            <Image
              src={banner}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4">
            <h4 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
              FAQ
            </h4>
          </div>
        </div>
        <div className="bg-secondary bg-opacity-30 py-12">
          <FaqAccordion />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
