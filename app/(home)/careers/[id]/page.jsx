import CareerDetails from "@/components/extra/CareerDetails";
import banner from "@/public/banner1.png";
import Image from "next/image";

export const metadata = {
  title: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const JobDetails = ({ params }) => {
  return (
    <div>
      <div className="relative flex justify-center items-center py-12 min-h-[20vh] sm:min-h-[20vh] z-1">
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
            Featured Jobs
          </h4>
        </div>
      </div>
      <div className="container text-center my-8">
        <h1 className="text-3xl font-bold mb-4">Join Our Team</h1>
        <p className="text-gray-600">
          Are you passionate about making a difference and shaping the future?
          Join our dynamic team of talented individuals who are dedicated to
          innovation, collaboration, and excellence. At Gulf Cars Auction, we
          believe in fostering a supportive and inclusive work environment where
          every team member is valued and empowered to thrive.
        </p>
      </div>
      <div className="container pb-12">
        <div className="flex justify-center items-center gap-4">
          <CareerDetails id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
