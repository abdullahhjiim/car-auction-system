"use client";
import CarImage from "@/components/cars/CarImage";
import WatchUnWatch from "@/components/cars/WatchUnWatch";
import AuctionRelatedCars from "@/components/single-car/AuctionRelatedCars";
import BidInformations from "@/components/single-car/BidInformations";
import BuyNow from "@/components/single-car/BuyNow";
import ContactMore from "@/components/single-car/ContactMore";
import RelatedCars from "@/components/single-car/RelatedCars";
import SaleInfo from "@/components/single-car/SaleInfo";
import VehicleInformation from "@/components/single-car/VehicleInformation";
import { getVehicleDetails } from "@/lib/car/getCar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const VehicleDetails = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const vehicleData = await getVehicleDetails(id, token);
      setLoading(false);
      if (vehicleData) {
        setData(vehicleData?.data);
      } else {
        router.push("/vehicles/not-found-vehicle");
      }
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4">
      {loading && <p>Loading...</p>}
      {data && (
        <>
          <div className="flex justify-between items-center gap-4">
            <div>
              <h4 className="text-2xl md:text-4xl font-bold">{data?.title}</h4>
              <p className="mt-3 text-[12px]">
                Lot #{" "}
                <span className="text-primary font-semibold">
                  {data?.lot_number}
                </span>{" "}
                | Sale Location: <span>{data?.auction_yard_name}</span> | Sale
                Date: <span>{data?.sale_time}</span>
              </p>
            </div>
            <WatchUnWatch data={data} />
          </div>
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
          <div>
            <RelatedCars url={`/lot/${data?.lot_number}/similar-vehicles`} />
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleDetails;
