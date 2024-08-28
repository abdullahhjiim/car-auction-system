'use client';

import { auctionBreak, clearWatchToast, joinAuction } from '@/app/(home)/features';
import BidSidebar from '@/components/bid/BidSidebar';
import SingleCarBidImages from '@/components/bid/SingleCarBidImages';
import Topbar from '@/components/bid/Topbar';
import UpcomingLots from '@/components/bid/UpcomingLots';
import thankyougif from '@/public/thankyou.gif';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BreakTime from '../preview/BreakTime';
import { authAxios } from '/app/(home)/axious-config';
import MyPusher from '/app/(home)/config';
import {
  bidEnded,
  bonusTime,
  newBid,
  readyToBid,
  removeRunningAuction,
  setAddAuction,
  setUpcomingVehicle,
} from '/app/(home)/features';

const ManageAuction = ({
  auction,
  auctionId,
  token,
  userId,
  runningAuctionIds,
  removeShow,
  index,
}) => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
  const [pusherInstance, setPusherInstance] = useState(null);
  const [upcomingInterval, setUpcomingInterval] = useState(null);

  useEffect(() => {
    if (auctionId) {
      if (token) {
        const pusher = MyPusher(token);
        // TODO:: pusher 403 status handle
        const channel = pusher.subscribe(`private-ga-auctions.${auctionId}`);
        setChannel(channel);
        setPusherInstance(pusher);
      }
    }

    return () => {
      if (pusherInstance) {
        channel.unsubscribe();
        pusherInstance.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId]);

  useEffect(() => {
    const uptoDateUpcoming = () => {
      authAxios
        .get(`/auctions/${auctionId}/upcoming-vehicles`,{
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(
            setUpcomingVehicle({ auctionId, upcomingVehicles: res.data.data })
          );
        })
        .catch((err) => {
          console.log(err?.response);
        });
    };
    let intervalInstance = setInterval(uptoDateUpcoming, 10000);
    setUpcomingInterval(intervalInstance);

    return () => {
      clearInterval(intervalInstance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auction?.auction_ended || auction?.total_remaining_items == 0) {
      clearInterval(upcomingInterval);
    }

    auction?.toast_message
    if(auction?.toast_message) {

      toast( auction?.toast_message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(clearWatchToast({ auctionId }) );
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction]);

  useEffect(() => {
    if (channel && channel.bind) {
      channel.bind('READY_TO_BID', function (data) {
        // setNextItem(data?.next_item);
        dispatch(readyToBid({ ...data, auctionId }));
      });

      channel.bind('NEW_BID', function (data) {
        dispatch(newBid({ ...data, auctionId, userId }));
      });

      channel.bind('BONUS_TIME', function (data) {
        dispatch(bonusTime({ ...data, auctionId }));
      });

      channel.bind('BID_ENDED', function (data) {
        dispatch(bidEnded({ ...data, auctionId }));
      });

      channel.bind('AUCTION_BREAK', function (data) {
				console.log('auction break time', data);
				dispatch(auctionBreak({ ...data, auctionId }));
			});

      channel.bind('NEW_OFFLINE_BID', function (data) {
				console.log('NEW OFFLINE BID', data);
				// dispatch(auctionBreak({ ...data, auctionId }));
        dispatch(joinAuction({ auction_id : auctionId }));
			});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  let bgColor = 'bg-primary';
  let bidColor = '#B20A0B';
  let btnCon = false;

  if (auction?.own_bid_amount && auction?.bid_detail?.amount) {
    if (
      userId == auction?.bid_detail?.user_id ||
      auction?.own_bid_amount >= auction?.bid_detail?.amount
    ) {
      bgColor = 'bg-green-500';
      bidColor = '#008000';
      btnCon = true;
    } else {
      bgColor = 'bg-yellow-500';
      bidColor = '#FFFF00';
    }
  }

  const removeAuction = () => {
    dispatch(removeRunningAuction({ index, id: auctionId }));
    dispatch(setAddAuction(false));
    if (runningAuctionIds.length <= 1) {
      window.location.reload();
    }
  };

  return (
    <div className="mb-2 md:mb-2 max-w-[1100px] ">
      {auction?.is_break_running && (
					<BreakTime
						timeStr={auction?.break?.break_ended_at}
						title={auction?.break?.break_title}
						auctionId={auctionId}
					/>
				)}

      <div className={`container mx-auto px-4 border-2 border-gray-200 shadow-2xl ${auction?.is_break_running ? 'blur-sm' : ''}`}>
      
        {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h4 className="text-xl text-primary font-semibold text-center sm:text-start">
            {`Today's Auctions: ${auction?.auction_detail.title}`}
          </h4>
        </div> */}

        <div className="bg-white rounded-lg overflow-hidden mt-4">
          <Topbar
            auction={auction}
            removeAuction={removeAuction}
            removeShow={removeShow}
            index={index}
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-2 pb-2">
            {auction?.auction_ended && (
              <div className="w-full flex flex-col justify-start items-center border-b border-gray-500 pb-2">
                <div className="flex mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h4 className="ml-2 text-2xl font-semibold">
                    Auction Ended : {auction?.auction_detail?.title}{' '}
                  </h4>
                </div>
                <div className="flex justify-center items-center min-h-[400px]">
                  <Image
                    src={thankyougif}
                    alt="logo"
                    className="max-w-[350px] h-auto"
                  />
                </div>
              </div>
            )}
            {!auction?.auction_ended && (
              <>
                <div className="w-full sm:w-3/5">
                  <SingleCarBidImages
                    images={auction?.vehicle_detail?.vehicle_images}
                  />
                  
                </div>
                <BidSidebar
                  auction={auction}
                  auctionId={auctionId}
                  token={token}
                  bgColor={bgColor}
                  bidColor={bidColor}
                  btnCon={btnCon}
                  index={index}
                  userId={userId}
                />
              </>
            )}
          </div>
        </div>
        {!auction?.auction_ended && (
          <UpcomingLots
            auctionId={auctionId}
            upcomingVehicles={auction?.upcoming_vehicles}
          />
        )}
      </div>
    </div>
  );
};

export default ManageAuction;
