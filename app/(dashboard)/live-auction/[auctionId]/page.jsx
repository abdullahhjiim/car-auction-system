"use client";
import BreakTime from "@/components/preview/BreakTime";
import CarPreview from "@/components/preview/CarPreview";
import VehicleInformation from "@/components/preview/VehicleInformation";
import logo from "@/public/live_auction_logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Thankyou from "../Thankyou";
import { authAxios } from "/app/(home)/axious-config";
import MyPusher from "/app/(home)/config";

const Preview = ({ params }) => {
  const auctionId = params.auctionId;

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  };

  // const token = getCookie("adminToken");
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RldmFwaS5ndWxmY2FyYXVjdGlvbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3MjQ3NTMwMDMsImV4cCI6MTcyNDgzOTQwMywibmJmIjoxNzI0NzUzMDAzLCJqdGkiOiJEMDEySThnQXloMlFjRFh2Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.SAXQW8Om1EyEZqMsQlhzD3b_pAUnAg1WEZkkPCUxWRc";

  const [channel, setChannel] = useState(null);
  const [pusherInstance, setPusherInstance] = useState(null);
  const [auctionFinished, setAuctionFinished] = useState(false);
  const [upcomingData, setUpcomingData] = useState({});
  const [auctionData, setAuctionData] = useState({});
  const [data, setData] = useState({});
  const [auctionBreak, setAuctionBreak] = useState({});

  const uptoDateUpcoming = () => {
    authAxios
      .get(`/auctions/${auctionId}/upcoming-vehicles`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUpcomingData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAuctionData = () => {
    authAxios
      .get(`/auctions/${auctionId}/join`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAuctionData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (auctionId) {
      if (token) {
        const pusher = MyPusher(token);
        // TODO:: pusher 403 status handle
        const channel = pusher.subscribe(`private-ga-auctions.${auctionId}`);
        setChannel(channel);
        setPusherInstance(pusher);

        uptoDateUpcoming();
        getAuctionData();
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
    switch (data?.event) {
      case "READY_TO_BID": {
        if (
          auctionData?.vehicle_detail &&
          auctionData.vehicle_detail?.item_number_str !==
            data?.bid_info.current_item
        ) {
          let vehicle_detail = upcomingData[data?.bid_info.current_item];
          const cloneData = { ...auctionData };
          cloneData.vehicle_detail = vehicle_detail;
          cloneData.bid_detail = data?.bid_detail;
          setAuctionData(cloneData);
        }

        uptoDateUpcoming();
        break;
      }
      case "NEW_BID": {
        const cloneData = { ...auctionData };
        cloneData.bid_detail = {
          ...cloneData.bid_detail,
          amount: data?.bid_detail?.amount,
          previous_bids: data?.bid_detail?.previous_bids,
        };
        setAuctionData(cloneData);

        break;
      }
      case "BONUS_TIME": {
        break;
      }
      case "BID_ENDED": {
        if (data?.auction_finished == true) {
          setTimeout(() => {
            setAuctionFinished(data?.auction_finished);
          }, 2000);
        } else {
          setAuctionFinished(data?.auction_finished);
        }
        break;
      }
      case "AUCTION_BREAK": {
        console.log(data);
        if (data?.type == "ended") {
          setAuctionData({ ...auctionData, is_break_running: false });
        }
        setAuctionBreak(data);
        break;
      }
      case "NEW_OFFLINE_BID": {
        console.log(data);
        uptoDateUpcoming();
        getAuctionData();
        break;
      }

      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (channel && channel.bind) {
      channel.bind("READY_TO_BID", function (data) {
        console.log("ready to bid", data);
        setData({ ...data });
      });

      channel.bind("NEW_BID", function (data) {
        console.log("new bid", data);
        setData({ ...data });
      });

      channel.bind("BONUS_TIME", function (data) {
        setData({ ...data });
      });

      channel.bind("BID_ENDED", function (data) {
        console.log("ended", data);
        setData({ ...data });
      });

      channel.bind("AUCTION_BREAK", function (data) {
        console.log("break ", data);
        setData({ ...data });
      });

      channel.bind("NEW_OFFLINE_BID", function (data) {
        console.log("break ", data);
        setData({ ...data });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  if (auctionFinished) {
    return <Thankyou />;
  }

  let bgColor = "bg-primary";
  if (
    auctionData?.vehicle_detail?.sale_type == 2 &&
    auctionData?.bid_detail?.amount >=
      auctionData?.vehicle_detail?.reserve_amount
  ) {
    bgColor = "bg-green-500";
  } else if (
    auctionData?.vehicle_detail?.sale_type == 3 &&
    auctionData?.bid_detail?.amount >=
      auctionData?.vehicle_detail?.start_bid_amount
  ) {
    bgColor = "bg-green-500";
  }

  let saleText = "";

  if (data?.event == "BID_ENDED" && bgColor == "bg-green-500") {
    saleText = "Sold";
  }

  let timeStr = "";
  let title = "";
  if (auctionBreak?.type == "started") {
    timeStr = auctionBreak?.break_ended_at;
    title = auctionBreak?.break_title;
  } else if (auctionData?.is_break_running) {
    timeStr = auctionData?.break?.break_ended_at;
    title = auctionData?.break?.break_title;
  }

  console.log(auctionData);

  return (
    <>
      <section className="px-4 relative font-alexandria ">
        {(auctionBreak?.type == "started" || auctionData?.is_break_running) && (
          <BreakTime timeStr={timeStr} title={title} />
        )}
        <div
          className={
            auctionBreak?.type == "started" || auctionData?.is_break_running
              ? "blur-sm"
              : ""
          }
        >
          <header>
            <div className="max-w-[2000px] px-1 mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="md:w-[30%] flex items-center">
                  <Image
                    src={logo}
                    alt="logo"
                    className="max-w-[500px] h-auto"
                  />
                </div>
                <div className="max-w-[300px] uppercase font-semibold flex flex-col items-end">
                  <p>{process.env.NEXT_PUBLIC_NUMBER_1}</p>
                  <p>{process.env.NEXT_PUBLIC_NUMBER_2}</p>
                  <span className="w-full bg-black h-[1px] block" />
                  <p className="uppercase">{process.env.NEXT_PUBLIC_EMAIL}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-[2000px] mx-auto  bg-primary text-white shadow-light p-4 md:px-8">
            <div className="flex justify-between items-center gap-x-4">
              <h6 className="text-2xl md:text-3xl lg:text-4xl font-medium w-[60%] 2xl:w-[66%] truncate uppercase">
                {auctionData?.vehicle_detail?.title}
              </h6>
              <h6 className="text-2xl md:text-3xl lg:text-5xl font-semibold border-l-white border-l-2 pl-2 xl:pl-4 w-[10%] 2xl:w-[11%] text-center">
                # {auctionData?.vehicle_detail?.serial}
              </h6>
              <h6 className="text-2xl md:text-3xl lg:text-4xl font-medium border-l-white border-l-2 pl-2 xl:pl-4 w-[30%] 2xl:w-[22%] text-center">
                DATE : {auctionData?.auction_detail?.auction_date}
              </h6>
            </div>
          </div>

          {auctionFinished && (
            <div className="text-center text-3xl mt-3">
              Auction has Finished
            </div>
          )}
          {!auctionFinished && (
            <div className="max-w-[2000px] mx-auto">
              {auctionData?.vehicle_detail && (
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8 max-w-full overflow-hidden mt-2">
                  <div className="w-full lg:w-[50%]">
                    <CarPreview
                      images={auctionData?.vehicle_detail?.vehicle_images}
                      saleText={saleText}
                    />
                    <div className={`w-full p-10 ${bgColor} mt-1 text-white`}>
                      <h5 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center flex justify-center items-center  gap-4 lg:gap-x-11 uppercase">
                        <span className="lg:text-5xl font-medium">
                          {auctionData?.bid_detail?.amount > 0
                            ? auctionData?.bid_info?.bid_type == "ONLINE"
                              ? "Online Bid"
                              : "Auction Bid"
                            : "Start BID"}
                        </span>
                        AED{" "}
                        {auctionData?.bid_detail?.amount > 0
                          ? auctionData?.bid_detail?.amount
                          : auctionData?.vehicle_detail?.start_bid_amount}
                      </h5>
                    </div>
                  </div>
                  <div className="w-full lg:w-[50%]">
                    <VehicleInformation vehicle={auctionData?.vehicle_detail} />

                    {/* upcoming cars */}
                    <div className="w-full mt-4">
                      <h5 className="text-2xl md:text-3xl mb-2 font-bold uppercase text-primary">
                        Upcoming Cars:
                      </h5>

                      <div className="grid grid-cols-2 gap-4 h-[85px] overflow-y-scroll">
                        {upcomingData &&
                          Object.values(upcomingData)
                            .slice(0, 2)
                            .map((item, index) => {
                              return (
                                <div className="flex gap-3" key={index}>
                                  <div className="">
                                    <Image
                                      src={item?.thumbnail_url}
                                      alt=""
                                      width={200}
                                      height={100}
                                      className="w-[150px] h-[75px] object-cover rounded"
                                    />
                                  </div>
                                  <div>
                                    <h5 className="text-lg font-bold">
                                      # {item?.serial}
                                    </h5>
                                    <p className="text-[16px] opacity-75 uppercase">
                                      {item?.title}
                                    </p>
                                    <p className="text-[16px] opacity-75 uppercase">
                                      <span className="">Strating Bid :</span>{" "}
                                      {parseInt(item?.current_bid_amount) > 0
                                        ? parseInt(item?.current_bid_amount) +
                                          parseInt(item?.bid_increment)
                                        : parseInt(item?.start_bid_amount)}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                      </div>

                      {auctionData?.bid_detail?.previous_bids &&
                        auctionData?.bid_detail?.previous_bids.length > 0 && (
                          <div className="bg-gray-800 h-[95px]">
                            <div className="uppercase p-2">
                              {auctionData?.bid_detail?.previous_bids
                                .slice(0, 3)
                                .map((item, index) => {
                                  return (
                                    <p
                                      className="text-white font-bold text-xl uppercase"
                                      key={index}
                                    >
                                      <span>AED {item?.amount}</span> &nbsp;
                                      &nbsp; &nbsp; &nbsp; BY {item?.username}{" "}
                                      &nbsp; &nbsp; &nbsp; &nbsp;
                                      <span>FROM {item?.country}</span>
                                    </p>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      <hr className="mt-6 mb-1 border-black" />
                      <Link
                        href={`/`}
                        className="flex justify-end text-end font-bold"
                      >
                        <span className="text-primary">GULF</span>CARAUCTION.COM
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Preview;
