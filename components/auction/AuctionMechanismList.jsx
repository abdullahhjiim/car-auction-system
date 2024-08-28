/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ManageAuction from "@/components/manageAuction/manageAuction";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuction,
  getAuctionList,
  joinAuction,
  setAddAuction,
  setRunningAuctionIds,
} from "/app/(home)/features";
import { getTimezoneAbbreviation } from "/app/(home)/utils/time";

const AuctionMechanismList = () => {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const auction = useSelector((state) => state.auction);

  useEffect(() => {
    let auction_id = params.get("auction_id");

    if (auction_id) {
      _goToJoin(parseInt(auction_id));
    } else {
      dispatch(clearAuction());
      router.push("/auctions");
    }

    if (!token) {
      dispatch(clearAuction());
      router.push("/login");
    }

    return () => {
      dispatch(clearAuction());
    };
  }, []);

  const _goToJoin = (auction_id) => {
    if (token) {
      let running_auction_ids = [...auction.running_auction_ids];
      let findExists = running_auction_ids.find((ele) => ele === auction_id);

      dispatch(joinAuction({ auction_id }));
      if (!findExists) {
        running_auction_ids.push(auction_id);
        dispatch(setRunningAuctionIds({ running_auction_ids }));
        dispatch(setAddAuction(false));
      }
    } else {
      dispatch(clearAuction());
      router.push("/login");
    }
  };

  const removeShow =
    (auction?.running_auction.length > 0 && auction.add_auction) ||
    auction?.running_auction.length > 1;

  const addAuction = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tz_short = getTimezoneAbbreviation(new Date());

    dispatch(
      getAuctionList({
        timezone,
        tz_short,
        running_auction_ids: auction?.running_auction_ids,
      })
    );
    dispatch(setAddAuction(true));
  };

  const removeAddAuction = () => {
    dispatch(setAddAuction(false));
  };

  return (
    <div className="">
      <div className="flex justify-center my-6 md:my-6">
        <div className="mx-auto px-4">
          <h4 className="text-xl text-primary font-semibold text-center sm:text-start uppercase">
            {`Today's Auctions : `}{" "}
            {/* <button
              onClick={addAuction}
              className="bg-primary text-white text-sm px-2 py-1 rounded-md cursor-pointer"
            >
              Add Auction +
            </button> */}
          </h4>
        </div>
      </div>

      <div className="flex justify-center">
        {auction &&
          auction?.running_auction &&
          auction?.running_auction.length > 0 &&
          auction?.running_auction.map((e, i) => (
            <ManageAuction
              auction={e}
              auctionId={e?.auction_detail?.id}
              key={e?.auction_detail?.id}
              token={token}
              userId={user?.id}
              runningAuctionIds={auction.running_auction_ids}
              index={i}
              removeShow={removeShow}
            />
          ))}

        {auction && auction?.add_auction && (
          <div className="my-6">
            <div className="container mx-auto px-4">
              <div className="shadow-2xl">
                <div className="card-header bg-primary rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="p-2 text-white">
                      Auction Today&apos;s (
                      {auction?.auction_list?.total_auctions})
                    </div>
                    <div className="p-2">
                      {removeShow && (
                        <span
                          className="ms-auto cursor-pointer text-white"
                          onClick={removeAddAuction}
                        >
                          X
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                              <tr>
                                <th scope="col" className="px-6 py-4">
                                  Time
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Location
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Serial
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {auction?.auction_list?.auction_list_loading && (
                                <tr>
                                  <td colSpan={4}>Loading...</td>
                                </tr>
                              )}

                              {!auction?.auction_list?.auction_list_loading &&
                                auction?.auction_list?.live_auctions?.length >
                                  0 &&
                                auction?.auction_list?.live_auctions.map(
                                  (e) => {
                                    return (
                                      <tr
                                        className="border-b dark:border-neutral-500"
                                        key={e.id}
                                      >
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                          <div className="">
                                            <strong>{e?.auction_time}</strong>
                                          </div>
                                          <div>{e?.location_name}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          {e?.auction_yard_name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          <div className="flex flex-cols">
                                            <strong>{e?.serial}</strong>
                                            <strong>
                                              {e.total_vehicles} Lots
                                            </strong>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          {" "}
                                          <button
                                            className="bg-primary text-white font-semibold rounded-md p-2"
                                            onClick={() => _goToJoin(e.id)}
                                          >
                                            Join
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}

                              {auction?.auction_list &&
                                auction?.auction_list?.live_auctions?.length ===
                                  0 && (
                                  <tr className="text-center">
                                    <td colSpan={4}> No Live Auctions</td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionMechanismList;
