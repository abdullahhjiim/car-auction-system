"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTimer from "../extra/MyTimer";
import LoginModal from "../login/login";
import { CommonBidItem } from "./CommonBidItem";
import { authAxios } from "/app/(home)/axious-config";

const inputData = { amount: "" };

const BidInformations = ({ vehicle }) => {
  const router = useRouter();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidType, setBidType] = useState("monster");
  const [bidInputs, setBidInputs] = useState(inputData);
  const [bidError, setBidError] = useState({ error: false, message: "" });
  const [isRefresh, setIsRefresh] = useState(false);
  const [missTypeAmount, setMissTypeAmount] = useState("");
  const [misBidError, setMisBidError] = useState("");

  const [confirmation, setConfirmation] = useState({
    isConfirm: false,
    type: "",
    amount: "",
  });
  const [missTypeObj, setMissTypeObj] = useState({
    isConfirm: false,
    your_bid: "",
    max_bid: "",
  });

  const [mosterBidError, setMosterBidError] = useState("");

  const _handleBidValidation = () => {
    if (vehicle?.auction_status === 7) {
      router.push(`/auction-list?auction_id=${vehicle?.auction_id}`);
    } else {
      let confirmData = {
        isConfirm: true,
        type: bidType,
        amount:
          bidInputs?.amount > 0 ? bidInputs?.amount : vehicle?.minimum_bid,
      };
      setConfirmation(confirmData);
    }
  };

  const _toggle = () => {
    let { approve_for_bidding } = user;

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

  const setModalClose = () => {
    setModal(false);
  };

  const _handleBidType = (e) => {
    setBidError({ error: false, message: "" });
    setBidType(e.target.value);
  };

  const _handleCancelConfirmation = () => {
    let confirmData = {
      isConfirm: false,
      amount: "",
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

  const _handleConfirmation = () => {
    setBidLoading(true);

    let requestData = {
      amount: confirmation.amount,
    };

    requestData.type = confirmation?.type;

    authAxios
      .post(`/lot/${vehicle.id}/offline-bid`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast(res?.data?.message ?? "", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

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

  // Refresh
  const _handlePageRefresh = () => {
    router.refresh(window.location.pathname);
  };

  const buttonCondition =
    vehicle?.current_bid_amount > 0 && bidType?.toString() === "max";

  const handleBidIncrement = (property) => {
    if (bidInputs[property] > 0) {
      setBidInputs({
        ...bidInputs,
        [property]: bidInputs[property] + vehicle?.bid_increment,
      });
    } else {
      setBidInputs({
        ...bidInputs,
        [property]: vehicle?.minimum_bid + vehicle?.bid_increment,
      });
    }
  };

  const handleBidDecrement = (property) => {
    if (bidInputs[property] > 0) {
      if (
        vehicle?.minimum_bid <=
        bidInputs[property] - vehicle?.bid_increment
      ) {
        setBidInputs({
          ...bidInputs,
          [property]: bidInputs[property] - vehicle?.bid_increment,
        });
      }
    }
  };

  const _handleMissType = () => {
    let confirmData = {
      isConfirm: true,
      type: "",
      amount: "",
    };
    let missTypeData = {
      isConfirm: true,
      your_bid: vehicle?.current_bid_amount,
      max_bid: vehicle?.my_max_bid,
    };
    setConfirmation(confirmData);
    setMissTypeObj(missTypeData);
  };

  const missTypeSubmit = () => {
    if (missTypeAmount && missTypeAmount > 0) {
      setMisBidError("");
      setBidLoading(true);

      let requestData = {
        amount: missTypeAmount,
      };

      authAxios
        .post(`/lot/${vehicle.id}/mistyped-bid`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBidLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setBidLoading(false);
          if (err?.response?.data?.message) {
            setMisBidError(err?.response?.data?.message);
          }
        });
    }
  };

  return (
    <div>
      {!confirmation?.isConfirm && (
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

                <MyTimer auction={vehicle} />

                <li className="flex flex-col bg-primary-opacity-05">
                  <div className="relative py-3">
                    {/* <div className="flex items-center">
                      <span className="me-7">Your Bid: </span>

                      <div className="form-check px-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="bid_type"
                          value="monster"
                          checked={bidType.toString() === "monster"}
                          onChange={_handleBidType}
                          id="monster"
                        />
                        <label className="form-check-label" htmlFor="monster">
                          {" "}
                          Monster{" "}
                        </label>
                      </div>
                      <div className="form-check px-3">
                        <input
                          className=""
                          type="radio"
                          name="bid_type"
                          value="max"
                          checked={bidType.toString() === "max"}
                          onChange={_handleBidType}
                          id="max"
                        />

                        <label className="form-check-label" htmlFor="max">
                          {" "}
                          Max{" "}
                        </label>
                      </div>
                    </div> */}
                    <div className="flex flex-col items-center">
                      <div className="w-full p-2">
                        <div className="flex space-x-4 justify-center">
                          <div className="border-2 border-primary p-2 rounded-full flex justify-between items-center gap-x-2">
                            <button
                              onClick={() => handleBidDecrement("amount")}
                              disabled={
                                vehicle?.minimum_bid >= bidInputs.amount
                              }
                              className="w-8 h-8 border-2 text-primary border-primary p-2 text-2xl font-semibold rounded-full flex justify-center items-center hover:bg-primary hover:text-white duration-500"
                            >
                              -
                            </button>
                            <h5 className="text-xl text-center font-bold mx-auto !focus:shadow-none whitespace-nowrap">
                              AED{" "}
                              {bidInputs.amount > 0
                                ? bidInputs.amount
                                : vehicle?.minimum_bid}
                            </h5>
                            <button
                              onClick={() => handleBidIncrement("amount")}
                              className="w-8 h-8 border-2 text-primary border-primary p-2 text-2xl font-semibold rounded-full flex justify-center items-center hover:bg-primary hover:text-white duration-500"
                            >
                              +
                            </button>
                          </div>
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
                      </div>
                      <div className="mt-2">
                        {buttonCondition &&
                          vehicle?.my_max_bid > vehicle?.current_bid_amount && (
                            <button
                              className="bg-primary  px-2 py-1 rounded-md text-white mr-2"
                              onClick={_handleMissType}
                            >
                              MisType Bid
                            </button>
                          )}

                        <button
                          className="bg-primary  px-2 py-1 rounded-md text-white"
                          onClick={_toggle}
                        >
                          {buttonCondition && vehicle?.my_max_bid > 0
                            ? "Increased Bid"
                            : "Prebid Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>

          <div className="bg-primary bg-opacity-35 text-white rounded p-2 flex justify-between items-center gap-x-1">
            <h4 className="text-[12px] font-medium">
              All bids are legally binding and all sales are final.{" "}
            </h4>
          </div>
        </div>
      )}

      {confirmation?.isConfirm && !missTypeObj?.isConfirm && (
        <div className="border border-primary rounded overflow-hidden mb-2">
          <div className="bg-primary text-white rounded p-3 flex justify-between items-center gap-x-1">
            <h4 className="text-lg font-semibold">Confirm Your Bid</h4>
            <p className="text-[12px]"></p>
            <p className="text-[12px]"></p>
          </div>

          <div className="p-3">
            <ul className="">
              {confirmation?.amount && (
                <li className="flex justify-between mb-2">
                  <div>Your Bid :</div>
                  <span className="text-right">AED {confirmation?.amount}</span>
                </li>
              )}
            </ul>
            <div className="bg-white">
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
                        {bidLoading ? "Processing..." : "Confirm your Bid"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmation?.isConfirm && missTypeObj?.isConfirm && (
        <div className="border border-primary rounded overflow-hidden mb-2">
          <div className="bg-primary text-white rounded p-3 flex justify-between items-center gap-x-1">
            <h4 className="text-lg font-semibold">Confirm Your Bid</h4>
            <p className="text-[12px]"></p>
            <p className="text-[12px]"></p>
          </div>

          <div className="p-3">
            <ul className="">
              <li className="flex justify-between mb-2">
                <div>Your Bid :</div>
                <span className="text-right">
                  AED {vehicle?.current_bid_amount}
                </span>
              </li>
            </ul>
            <ul className="">
              <li className="flex justify-between mb-2">
                <div>Max Bid :</div>
                <span className="text-right">AED {vehicle?.my_max_bid}</span>
              </li>
            </ul>
            <ul className="">
              <li className="flex justify-between mb-2 items-center">
                <div>New Max Bid :</div>
                <input
                  onChange={(e) => setMissTypeAmount(e.target.value)}
                  type="number"
                  placeholder="Bid Amount"
                  value={missTypeAmount}
                  className="input-with-shadow"
                />
              </li>
            </ul>

            {misBidError && (
              <p className="text-right text-sm font-semibold text-red-400">
                {misBidError}
              </p>
            )}
            <div className="text-right mt-2">
              <button
                onClick={missTypeSubmit}
                disabled={bidLoading}
                className="px-2 py-1 bg-primary rounded-md text-white hover:bg-opacity-60 duration-200 "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default BidInformations;
