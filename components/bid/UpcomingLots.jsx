import { setWatchUnwatch } from "@/app/(home)/features";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

const UpcomingLots = ({ auctionId, upcomingVehicles }) => {
  const dispatch = useDispatch();
  const handleWatch = (vehicleId, watch, lotIndex) => {
    dispatch(setWatchUnwatch({ auctionId, vehicleId, watch, lotIndex }));
  };

  return (
    <div className="mt-12">
      {upcomingVehicles && upcomingVehicles.length > 0 && (
        <>
          <h6 className="mb-3 font-bold text-primary text-xl uppercase">
            Upcoming Lots :
          </h6>
          <div className="flex flex-wrap">
            {upcomingVehicles.map((item, i) => {
              return (
                <div
                  className="w-full sm:w-full xl:w-1/2 p-2 flex items-center gap-x-4 sm:mb-2"
                  key={i}
                >
                  <Image
                    src={item.thumbnail_url}
                    alt="car"
                    className="max-w-[100px] lg:max-w-[200px] w-auto object-cover rounded-md"
                    height={100}
                    width={200}
                  />
                  <div className="flex flex-col gap-y-1">
                    {item?.watched ? (
                      <button
                        onClick={() => handleWatch(item?.id, item?.watched, i)}
                        className="mb-2 text-sm border border-primary text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-2 flex justify-center items-center gap-x-1"
                      >
                        Unwatch <FaHeart />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleWatch(item?.id, item?.watched, i)}
                        className="mb-2 text-sm border border-primary text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-2 flex justify-center items-center gap-x-1"
                      >
                        Watch <FaRegHeart />
                      </button>
                    )}

                    <h4 className="text-md font-medium sm:max-w-[200px] overflow-hidden sm:whitespace-nowrap text-ellipsis">
                      {item.title}
                    </h4>
                    <p className="flex gap-x-2 text-sm">
                      Lot :{" "}
                      <span className="font-semibold">{item.lot_number}</span>{" "}
                      RUN : <span className="font-semibold">{item.serial}</span>
                    </p>
                    <p className="text-sm">
                      Odometer :{" "}
                      <span className="font-semibold">{item.odometer}</span>
                    </p>
                    <p className="text-sm">
                      Start Bid Amount :{" "}
                      <span className="font-semibold">
                        {item.start_bid_amount}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingLots;
