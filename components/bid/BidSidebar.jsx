/* eslint-disable @next/next/no-img-element */
"use client";

import { useDispatch } from "react-redux";
import AuctionSound from "../auction/AuctionSound";
import BidButton from "./BidButton";
import SingleCarBidDetails from "./SingleCarBidDetails";
import { setAuctionEnded } from "/app/(home)/features";

const BidSidebar = ({
  auction,
  auctionId,
  token,
  bgColor,
  bidColor,
  btnCon,
  index,
  userId,
}) => {
  const dispatch = useDispatch();

  let key = 0;
  let isPlaying = false;

  const event = auction?.event;
  if (event == "NEW_BID") {
    key = key + auction?.bid_detail?.amount;
    isPlaying = true;
  } else if (event == "READY_TO_BID") {
    key = key + 1;
    isPlaying = true;
  } else if (event == "BID_ENDED") {
    key = key + auction?.bid_detail?.amount + 3;
    isPlaying = false;
  } else if (event == "BONUS_TIME") {
    key = key + auction?.bid_detail?.amount + 1;
    isPlaying = true;
  }

  if (auction?.auction_finished) {
    setTimeout(() => {
      dispatch(setAuctionEnded({ index }));
    }, 2000);
  }

  return (
    <div className="w-full sm:w-2/5">
      <div className={`relative  `}>
        <div className="absolute top-2 right-2 cursor-pointer hover:text-primary duration-300"></div>
        {/* <ProgressBar
          bid_detail={auction?.bid_detail}
          interval={auction?.interval}
          event={auction?.event}
          bidColor={bidColor}
          key={key}
          isPlaying={isPlaying}
          isOnline={auction?.auction_detail?.auction_type == "online"}
          miliSecond={auction?.auction_detail?.auction_at_in_milliseconds}
          msg={auction?.msg}
        /> */}

        <h4 className="text-xl lg:text-2xl bg-gray-200 rounded-md m-1 p-1 font-bold text-primary flex justify-center">
          {auction?.vehicle_detail?.title}
        </h4>

        <div className={`${bgColor} bg-opacity-20 w-full rounded p-4`}>
          <h3 className="flex justify-center text-4xl font-semibold">
            {auction?.bid_detail?.amount ??
              auction?.bid_info?.minimum_bid_amount}{" "}
            AED
          </h3>

          <h4 className="text-center text-xs my-2 text-primary">
            All Bid in AED
          </h4>

          {auction?.auction_detail?.auction_type == "online" && (
            <>
              {(auction?.event === "READY_TO_BID" ||
                auction?.event === "NEW_BID" ||
                auction?.event === "BONUS_TIME") && (
                <BidButton
                  auction={auction}
                  auctionId={auctionId}
                  token={token}
                  btnCon={btnCon}
                />
              )}
            </>
          )}
        </div>

        <AuctionSound auction={auction} userId={userId} />

        <SingleCarBidDetails vehicle={auction?.vehicle_detail} />

        {/* {auction?.auction_detail?.auction_type == "online" && (
          <>
            {(auction?.event === "READY_TO_BID" ||
              auction?.event === "NEW_BID" ||
              auction?.event === "BONUS_TIME") && (
              <BidButton
                auction={auction}
                auctionId={auctionId}
                token={token}
                btnCon={btnCon}
              />
            )}

            {auction?.bid_detail?.previous_bids?.length > 0 && (
              <div className="mt-3">
                <h6 className="text-primary font-medium text-lg mb-3">
                  Previous Bids:
                </h6>
                <div className="flex flex-wrap gap-4">
                  {auction?.bid_detail?.previous_bids.map((item, i) => {
                    const { flag, country, amount } = item;
                    return (
                      <div
                        className="flex items-center gap-x-1 max-w-[180px]"
                        key={i}
                      >
                        <img
                          src={flag}
                          alt="flag"
                          className="max-w-[40px] h-auto object-cover"
                        />
                        <div>
                          <h4 className="font-medium max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {country}
                          </h4>
                          <p className="font-bold text-xl">{amount}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

export default BidSidebar;
