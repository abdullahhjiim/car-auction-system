"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginModal from "../login/login";
import { CommonBidItem } from "./CommonBidItem";
import { authAxios } from "/app/(home)/axious-config";
import { checkNumberOrFloat } from "/app/(home)/utils/checkNumberOrFloat";

const inputData = { start_amount: "", amount: "" };

const BidInformations = ({ vehicle }) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidType, setBidType] = useState("max");
  const [misTypeBidAmount, setMisTypeBidAmount] = useState("");
  const [misTypeBid, setMisTypeBid] = useState(false);
  const [bidInputs, setBidInputs] = useState(inputData);
  const [bidError, setBidError] = useState({ error: false, message: "" });
  const [isRefresh, setIsRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({
    isConfirm: false,
    type: "",
    amount: "",
    start_amount: "",
  });

  const { user } = useSelector((state) => state.auth);
  const [mosterBidError, setMosterBidError] = useState("");
  const [learnModal, setLearnModal] = useState(false);

  const _handleBidValidation = () => {
    if (vehicle?.auction_status === 7) {
      router.push(`/auction-list?auction_id=${vehicle?.auction_id}`);
    } else if (vehicle?.current_bid_amount <= 0) {
      let minimumBid = vehicle?.bid_increment;
      if (bidInputs?.start_amount < minimumBid) {
        let messageInfo = {
          error: true,
          message: `Please enter a bid at minimum ${minimumBid}`,
        };
        setBidError(messageInfo);
      }

      if (parseInt(bidInputs.start_amount) > parseInt(bidInputs.amount)) {
        let errorInfo = {
          error: true,
          message: `Maximum bid can not be less than starting bid.`,
        };
        setBidError(errorInfo);
      }

      if (
        parseInt(bidInputs.start_amount) == 0 ||
        parseInt(bidInputs.amount) == 0
      ) {
        let errorInfo = {
          error: true,
          message: `Starting or Maximum bid can not be 0.`,
        };

        setBidError(errorInfo);
      }
      if (
        bidInputs?.start_amount > 0 &&
        bidInputs?.amount > 0 &&
        parseInt(bidInputs.start_amount) <= parseInt(bidInputs.amount)
      ) {
        let confirmData = {
          isConfirm: true,
          start_amount: bidInputs?.start_amount,
          amount: bidInputs?.amount,
          type: "",
        };

        setConfirmation(confirmData);
      }
    } else if (vehicle?.current_bid_amount && vehicle?.current_bid_amount > 0) {
      if (bidType && bidType === "max" && !parseInt(bidInputs.amount)) {
        let errorInfo = {
          error: true,
          message: `This field is required`,
        };
        setBidError(errorInfo);
      }
      if (bidType && bidType === "monster" && !parseInt(bidInputs.amount)) {
        let errorInfo = {
          error: true,
          message: `This field is required`,
        };
        setBidError(errorInfo);
      }
      if (
        bidType &&
        bidType === "max" &&
        parseInt(bidInputs?.amount) < vehicle?.max_minimum_bid
      ) {
        let errorInfo = {
          error: true,
          message: `Please enter a bid at minimum ${vehicle?.max_minimum_bid}`,
        };
        setBidError(errorInfo);
      }

      if (
        bidType &&
        bidType === "monster" &&
        parseInt(bidInputs?.amount) <
          parseInt(vehicle?.current_bid_amount + vehicle?.bid_increment)
      ) {
        let errorInfo = {
          error: true,
          message: `Monster Bid amount should greater than or equal ${
            vehicle?.current_bid_amount + vehicle?.bid_increment
          }`,
        };
        setBidError(errorInfo);
      }
      if (
        bidType &&
        bidType === "max" &&
        parseInt(bidInputs?.amount) >= vehicle?.max_minimum_bid
      ) {
        let confirmData = {
          isConfirm: true,
          type: bidType,
          amount: bidInputs?.amount,
          start_amount: "",
        };
        setConfirmation(confirmData);
      }

      if (
        bidType &&
        bidType === "monster" &&
        parseInt(bidInputs?.amount) >=
          parseInt(vehicle?.current_bid_amount + vehicle?.bid_increment)
      ) {
        let confirmData = {
          isConfirm: true,
          type: bidType,
          amount: bidInputs?.amount,
          start_amount: "",
        };
        setConfirmation(confirmData);
      }
    }
  };

  const _toggle = () => {
    let { approve_for_bidding } = user;

    console.log(approve_for_bidding);

    if (!isAuthenticated) {
      setModal(true);
    } else if (approve_for_bidding === 2) {
      toast(
        "You are not eligible to bid on this vehicle. There may be an issue with your Token fee. Contact Member Services for more information",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else if (approve_for_bidding === 1) {
      _handleBidValidation();
    }
  };

  const _checkBid = () => {
    if (!isAuthenticated) {
      // setModal(!modal);
      router.push("/login");
    } else {
      console.log("Send request to the server for query");
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  const _onChange = (e) => {
    const { name, value } = e.target;
    setBidInputs({
      ...bidInputs,
      [name]: value,
    });
  };

  const _handleBidType = (e) => {
    setBidError({ error: false, message: "" });
    setBidType(e.target.value);
  };

  const _handleCancelConfirmation = () => {
    let confirmData = {
      isConfirm: false,
      amount: "",
      start_amount: "",
      type: "",
    };
    setConfirmation(confirmData);

    let errorInfo = {
      error: false,
      message: "",
    };
    setBidError(errorInfo);
    setMosterBidError("");
  };

  const _handleCancelMistypeBid = () => {
    setMisTypeBid(false);
    _handleCancelConfirmation();
  };

  const _handleConfirmation = () => {
    setBidLoading(true);

    let requestData = {
      amount: confirmation.amount,
    };

    if (confirmation?.type) {
      requestData.type = confirmation?.type;
    } else {
      requestData.start_amount = confirmation?.start_amount;
    }

    authAxios
      .post(`/lot/${vehicle.id}/offline-bid`, requestData)
      .then((res) => {
        setBidLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setBidLoading(false);
        if (err?.response?.data?.message) {
          setMosterBidError(err?.response?.data?.message);
        }

        if (err?.response?.data?.is_refresh) {
          setIsRefresh(true);
        }
      });
  };

  const _handleMistypeConfirmation = () => {
    if (misTypeBidAmount) {
      authAxios
        .post(`lot/${data?.id}/mistyped-bid`, { amount: misTypeBidAmount })
        .then((res) => {
          setBidLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setBidError({ error: true, message: err?.response?.data?.message });
          setBidLoading(false);
        });
    } else {
      setBidError({ error: true, message: "Field is required!" });
    }
  };

  // Refresh
  const _handlePageRefresh = () => {
    router.refresh(window.location.pathname);
  };

  const _toggleLearnModal = (e) => {
    e.preventDefault();
    setLearnModal(!learnModal);
  };

  const buttonCondition =
    vehicle?.current_bid_amount > 0 && bidType?.toString() === "max";

  return (
    <div>
      {/* bid info */}
      {!misTypeBid && !confirmation?.isConfirm && (
        <div className="border border-primary rounded overflow-hidden mb-2">
          <div className="bg-primary text-white rounded p-3 flex justify-between items-center gap-x-1">
            <h4 className="text-lg font-semibold">Bid Informations</h4>
            <p className="text-[12px]"></p>
            <p className="text-[12px]"></p>
          </div>

          <div className="p-3">
            <div>
              <CommonBidItem data={vehicle} />
              <div className="flex flex-col">
                {vehicle?.my_max_bid > 0 && (
                  <li className="flex justify-between">
                    <p>Your Max Bid:</p>
                    <span>
                      <h6>{vehicle.my_max_bid ?? ""}</h6>
                    </span>
                  </li>
                )}

                {vehicle?.current_bid_amount === 0 && (
                  <>
                    <li className="flex justify-between">
                      <div className="w-1/2">
                        <span>Starting Bid :</span>

                        {/* <i
                          className="fa fa-question-circle ms-1 text-primary cursor-pointer"
                          ref={_refStartBid}
                        ></i> */}
                      </div>
                      <div className="w-1/2">
                        <div className="input-group">
                          <input
                            name="start_amount"
                            type="text"
                            placeholder="Bid Amount"
                            className="border-2 border-gray-400 p-1 w-[96%] rounded-md focus:border-pink-600"
                            onChange={_onChange}
                            value={checkNumberOrFloat(bidInputs.start_amount)}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="flex m-1">
                      <div className="ms-auto">
                        <div className="text-end">
                          {/* <button
                            className="bg-primary p-2 rounded-md  text-xs text-white"
                            onClick={() => setModalShow(true)}
                          >
                            Incremental Bid Guidelines
                          </button> */}
                          <span className="font-semibold text-gray-400 text-end text-xs">
                            ({vehicle?.bid_increment} AED Bid Increment)
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="flex justify-between">
                      <div className="w-1/2">Maximum Bid:</div>
                      <div className="w-1/2">
                        <input
                          name="amount"
                          type="text"
                          placeholder="Bid Amount"
                          className="border-2 border-gray-400 p-1 w-[96%] rounded-md focus:border-pink-600"
                          onChange={_onChange}
                          value={checkNumberOrFloat(bidInputs.amount)}
                        />
                      </div>
                    </li>
                    {bidError && bidError?.error && (
                      <p className="text-red-500 mb-1 px-3">
                        <span>{bidError?.message}</span>
                      </p>
                    )}
                    {/* {user?.approve_for_bidding == 1 && ( */}
                    <li className="flex justify-end">
                      <button
                        className="bg-primary px-2 py-1 mt-2 mr-1 rounded-md text-white hover:opacity-60 duration-200"
                        onClick={_toggle}
                      >
                        Bid Now
                      </button>
                    </li>
                    {/* )} */}
                  </>
                )}

                {vehicle?.current_bid_amount > 0 && (
                  <li className="flex flex-col bg-primary-opacity-05">
                    <div className="relative z-10 py-3">
                      <div className="flex items-center">
                        <span className="me-7">Your Bid: </span>
                        <div className="form-check px-3">
                          <input
                            className=""
                            type="radio"
                            name="bid_type"
                            value="max"
                            placeholder="Bid Amount"
                            checked={bidType.toString() === "max"}
                            onChange={_handleBidType}
                            id="max"
                          />
                          <label className="form-check-label" htmlFor="max">
                            {" "}
                            Max{" "}
                          </label>
                        </div>
                        <div className="form-check px-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="bid_type"
                            value="monster"
                            placeholder="Bid Amount"
                            checked={bidType.toString() === "monster"}
                            onChange={_handleBidType}
                            id="monster"
                          />
                          <label className="form-check-label" htmlFor="monster">
                            {" "}
                            Monster{" "}
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full p-2">
                          <div className="flex space-x-4">
                            <div className="mt-1">AED</div>
                            <input
                              name="amount"
                              type="text"
                              placeholder="Bid Amount"
                              className="border-2 border-gray-400 p-1 w-[96%] rounded-md focus:border-pink-600"
                              onChange={_onChange}
                              value={checkNumberOrFloat(bidInputs.amount)}
                            />
                          </div>
                        </div>
                        {bidError && bidError?.error && (
                          <p className="text-red-500 mb-1">
                            <strong>{bidError?.message}</strong>
                          </p>
                        )}
                        <div className="flex items-center my-2 text-sm">
                          <span className="text-xs text-gray-600">
                            {vehicle?.currency} {vehicle?.bid_increment} Bid
                            Increment
                          </span>
                          {/* <span
                            className="font-semibold text-sm text-primary cursor-pointer"
                            onClick={() => setModalShow(true)}
                          >
                            Incremental Bid Guidelines
                          </span> */}
                        </div>
                        <div className="mt-2">
                          {buttonCondition &&
                            vehicle?.my_max_bid >
                              vehicle?.current_bid_amount && (
                              <button
                                className="bg-primary px-2 py-1 rounded-md text-white m-1"
                                onClick={() => {
                                  setMisTypeBid(true);
                                  setBidError({ error: false, message: "" });
                                }}
                              >
                                Mistype Bid
                              </button>
                            )}
                          <button
                            className="bg-primary  px-2 py-1 rounded-md text-white"
                            onClick={_toggle}
                          >
                            {buttonCondition && vehicle?.my_max_bid > 0
                              ? "Increased Bid"
                              : "Bid Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )}

                {/* <div>
                <div className="flex justify-between gap-x-1 py-1">
                  <p className="font-semibold text-sm">Bid Status :</p>
                  <p className="font-semibold text-sm">
                    {vehicle?.bid_status_name}
                  </p>
                </div>
                <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
              </div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Starting Bid:</p>
                <input
                  type="number"
                  className="border border-primary border-opacity-20 rounded-md max-w-[120px] max-h-10 px-2 py-3"
                  placeholder="0"
                />
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Maximum Bid:</p>
                <input
                  type="number"
                  className="border border-primary border-opacity-20 rounded-md max-w-[120px] max-h-10 px-2 py-3"
                  placeholder="0"
                />
              </div>
              <button className="text-sm font-bold bg-primary text-white py-3 px-3 rounded-md mt-3">
                Bid Now
              </button> */}
              </div>
            </div>
          </div>

          <div className="bg-primary bg-opacity-35 text-white rounded p-2 flex justify-between items-center gap-x-1">
            <h4 className="text-[12px] font-medium">
              All bids are legally binding and all sales are final.{" "}
              {/* <span className="font-bold cursor-pointer hover:text-primary">
                Learn More
              </span> */}
            </h4>
          </div>
        </div>
      )}

      {!misTypeBid && confirmation?.isConfirm && (
        <div className="border border-primary rounded overflow-hidden mb-2">
          <div className="bg-primary text-white rounded p-3 flex justify-between items-center gap-x-1">
            <h4 className="text-lg font-semibold">Confirm Your Bid</h4>
            <p className="text-[12px]"></p>
            <p className="text-[12px]"></p>
          </div>

          <div className="p-3">
            <ul className="">
              {confirmation?.start_amount && (
                <li className="flex justify-between mb-2">
                  <div>Your Bid :</div>
                  <span className="text-right">
                    AED {confirmation?.start_amount}
                  </span>
                </li>
              )}

              <li className="flex justify-between mb-2">
                <div>{confirmation?.start_amount ? "Max" : "Your"} Bid :</div>
                <span className="text-right">AED {confirmation?.amount}</span>
              </li>
            </ul>
            <div className="bg-white">
              {/* <div className="text-right">
                <button
                  className="bg-primary p-2 rounded-md  text-xs text-white mb-2 "
                  onClick={() => setModalShow(true)}
                >
                  Incremental Bid Guidelines
                </button>
              </div> */}

              <div>
                <p className="text-center  text-xs font-semibold ">
                  Whether you selected Max Bid or a Monster Bid, by clicking on
                  the Confirm Your Bid button, you are committing to buy this
                  vehicle if you are the winning bidder. All bids are final.
                </p>
                {mosterBidError && (
                  <p className="text-red-500 text-center text-xs">
                    <strong>{mosterBidError}</strong>
                  </p>
                )}

                <div className="flex justify-center mt-2">
                  {isRefresh ? (
                    <button
                      className="bg-green-500 p-2 rounded-md text-sm text-white m-1"
                      onClick={_handlePageRefresh}
                    >
                      Refresh
                    </button>
                  ) : (
                    <>
                      <button
                        className="bg-red-500 p-2 rounded-md text-sm text-white m-1 hover:opacity-70"
                        onClick={_handleCancelConfirmation}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-primary p-2 rounded-md text-sm text-white m-1 hover:opacity-70"
                        disabled={bidLoading}
                        onClick={_handleConfirmation}
                      >
                        Confirm your Bid
                        {/* <span className="flex">
                          <span className="pe-1"></span>

                          {bidLoading && (
                            <span className="me-1" style={{ width: "23px" }}>
                              <SVGCircleAnimation />
                            </span>
                          )}
                        </span> */}
                      </button>
                    </>
                  )}
                </div>

                <div className="flex justify-center "></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {misTypeBid && (
        <div className="border border-primary rounded overflow-hidden mb-2">
          <div className="bg-primary text-white rounded p-3 flex justify-between items-center gap-x-1">
            <h4 className="text-lg font-semibold">Mistyped Bid?</h4>
            <p className="text-[12px]"></p>
            <p className="text-[12px]"></p>
          </div>

          <div className="p-3">
            <ul className="">
              <li className="flex justify-between">
                Your Bid:
                <span className="text-right">
                  AED {vehicle?.current_bid_amount}
                </span>
              </li>

              <li className="flex justify-between">
                Max Bid :
                <span className="text-right">AED {vehicle?.my_max_bid}</span>
              </li>
            </ul>

            <div className="mt-2">
              <div className="flex justify-between">
                <div className="w-3/5">Your New Max Bid :</div>
                <div className="w-2/5">
                  <span className="text-right">
                    <input
                      name="start_amount"
                      type="text"
                      placeholder="Bid Amount"
                      className="border-2 border-gray-400 p-1 w-[96%] rounded-md focus:border-pink-600"
                      onChange={(e) => setMisTypeBidAmount(e.target.value)}
                      value={checkNumberOrFloat(misTypeBidAmount)}
                    />
                    {bidError && bidError?.error && (
                      <p className="text-red-500 font-semibold ">
                        <span>{bidError?.message}</span>
                      </p>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3">
              <div>
                <p className="text-center text-xs">
                  If you have mistyped your Maximum Bid enter a new Maximum Bid
                  and click Confirm Bid. Your new Maximum Bid cannot be less
                  than the Current Bid. We will reduce your Maximum Bid to the
                  value entered or the current Bid whichever is greater.
                </p>
                <p className="text-center text-xs">
                  If you wish to keep or increase your current Maximum Bid click
                  the cancel button below to close the window.
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-red-500 p-1 rounded-md  font-xs text-white m-1 hover:opacity-70"
                    onClick={_handleCancelMistypeBid}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary p-1 rounded-md  font-xs text-white m-1 hover:opacity-70"
                    disabled={bidLoading}
                    onClick={_handleMistypeConfirmation}
                  >
                    Confirm your Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default BidInformations;
