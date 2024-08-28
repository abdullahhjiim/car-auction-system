import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  calculateBidDecrement,
  calculateBidIncrement,
} from "../auction/increment";
import { authAxios } from "/app/(home)/axious-config";

const BidButton = ({ auction, auctionId, token, btnCon }) => {
  const [bidAmount, setBidAmount] = useState(0);
  const [bidLoading, setBidLoading] = useState(false);
  const [monBidLoading, setMonBidLoading] = useState(false);

  let nextBidAmount = auction?.bid_info?.next_bid_amount;

  useEffect(() => {
    if (nextBidAmount >= bidAmount) {
      setBidAmount(nextBidAmount);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction]);

  const _handleBid = (type, callFunc) => {
    const item_id = auction?.bid_info?.item_number;
    let amount = type === "bid4you" ? nextBidAmount : bidAmount;

    if (item_id && amount > 0) {
      callFunc(true);
      authAxios
        .post(
          `/auctions/${auctionId}/new-bid`,
          { item_number: item_id, amount },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          callFunc(false);
        })
        .catch((e) => {
          callFunc(false);
          console.log(e);
          toast(
            e?.response?.data?.message ??
              "Something went wrong, Please contact with system admin",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        });
    }
  };

  // Increment
  const _handleUp = () => {
    let increment = calculateBidIncrement(bidAmount);
    setBidAmount(bidAmount + increment);
  };

  const minimum_bid_amount = auction?.bid_info?.minimum_bid_amount;
  // Decrement
  const _handleDown = () => {
    let decrement = calculateBidDecrement(bidAmount);
    if (minimum_bid_amount <= bidAmount - decrement) {
      setBidAmount(bidAmount - decrement);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 h-full">
        <button
          onClick={_handleDown}
          className="bg-black bg-opacity-50 hover:bg-primary text-sm text-white font-bold hover:bg-opacity-90 h-[40px] min-w-[50px] flex justify-center items-center rounded-md duration-300 cursor-pointer"
        >
          <FaMinus size={18} />
        </button>
        <input
          type="number"
          readOnly
          min={0}
          className="input-with-shadow w-full my-2"
          value={bidAmount}
        />
        <button
          onClick={_handleUp}
          className="bg-black bg-opacity-50 hover:bg-primary text-sm text-white font-bold hover:bg-opacity-90 h-[40px] min-w-[50px] flex justify-center items-center rounded-md duration-300 cursor-pointer"
        >
          <FaPlus size={18} />
        </button>
      </div>

      {auction?.vehicle_detail?.eligible_for_bidding &&
        auction?.vehicle_detail?.eligible_for_bidding === true && (
          <>
            {bidAmount > nextBidAmount ? (
              <button
                disabled={monBidLoading || btnCon}
                onClick={() => _handleBid("monsterBid", setMonBidLoading)}
                className={` bg-primary text-xl text-white font-bold w-full py-3 uppercase hover:bg-opacity-70 rounded-md duration-300 mt-2`}
              >
                Bid
              </button>
            ) : (
              <button
                disabled={bidLoading || btnCon}
                onClick={() => _handleBid("bid4you", setBidLoading)}
                className={` bg-primary text-xl text-white font-bold w-full py-3 uppercase hover:bg-opacity-70 rounded-md duration-300 mt-2`}
              >
                Bid
              </button>
            )}
          </>
        )}
      {auction?.vehicle_detail?.eligible_for_bidding === false && (
        <p className="text-center text-red-700 font-bold font-sm">
          You are not eligible to bid for this lot
        </p>
      )}
    </div>
  );
};

export default BidButton;
