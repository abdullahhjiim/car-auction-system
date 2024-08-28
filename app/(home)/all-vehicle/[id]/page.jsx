import VehicleDetails from "@/components/cars/VehicleDetails";
import { getVehicleDetails } from "@/lib/car/getCar";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  const vehicleData = await getVehicleDetails(params.id);

  return {
    title: vehicleData?.data?.title + " Gulf Cars Auction",
    description: vehicleData?.data?.title + " Gulf Cars Auction",
  };
};

const page = ({ params }) => {
  return (
    <>
      <div className="my-12">
        <Suspense fallback={<div className="loading"></div>}>
          <VehicleDetails id={params.id} />
        </Suspense>
      </div>
    </>
  );
};

export default page;
