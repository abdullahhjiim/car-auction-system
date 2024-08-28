"use client";
import PaymentModal from "@/components/admin/modal/PaymentModal";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";
import { setUser } from "/app/(home)/features";
import { setNotification } from "/app/(home)/features/notification/notificationSlice";

const DashbordCompoent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);
  const [modalOpened, setModalOpened] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "Deposit Account",
    type: "deposit",
  });

  useEffect(() => {
    setLoading(true);
    authAxios
      .get("/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch(
          setUser({
            user: res.data?.data,
            access_token: token,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push("/registration?step=4");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/member-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res?.data);
        setLoading(false);
        dispatch(setNotification(res?.data?.notifications));
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={` ${
          data?.global_message ? "md:py-6" : "md:py-12"
        } py-6 z-10`}
      >
        <div className="container mx-auto px-4">
          {data?.global_message && (
            <div className="flash_message py-4 bg-gray-200 my-4 px-2">
              <p> {data?.global_message} </p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <div className="shadow-light rounded-lg overflow-hidden w-full p-4">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <div className="flex flex-col justify-center items-center p-4 bg-primary rounded-xl text-white text-center shadow-light">
                    <h5 className="text-lg font-semibold">Deposit Amount</h5>
                    <p className="my-2">
                      <span className="font-bold text-4xl">
                        {data?.total_deposit_amount ?? "0"}
                      </span>{" "}
                      AED
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center p-4 bg-primary rounded-xl text-white text-center shadow-light">
                    <h5 className="text-lg font-semibold">
                      Available Bidding Limit
                    </h5>
                    <p className="my-2">
                      <span className="font-bold text-4xl">
                        {data?.available_bidding_limit ?? "0"}
                      </span>{" "}
                      AED
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center p-4 bg-primary rounded-xl text-white text-center shadow-light">
                    <h5 className="text-lg font-semibold">
                      Online Account Balance
                    </h5>
                    <p className="my-2">
                      <span className="font-bold text-4xl">
                        {data?.total_balance_amount ?? "0"}
                      </span>{" "}
                      AED
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center p-4 bg-primary rounded-xl text-white text-center shadow-light">
                    <h5 className="text-lg font-semibold">Total Payment Due</h5>
                    <p className="my-2">
                      <span className="font-bold text-4xl">
                        {data?.total_payment_due ?? "0"}
                      </span>{" "}
                      AED
                    </p>
                  </div>
                </div>

                <div className="my-8 w-full h-[1px] bg-gray-200 rounded-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`w-full py-3 bg-primary hover:bg-opacity-90 text-white text-lg font-medium rounded-full text-center flex justify-center items-center cursor-pointer`}
                    onClick={() => {
                      setModalInfo({
                        title: "Deposit Account",
                        type: "deposit",
                      });
                      setModalOpened(true);
                    }}
                  >
                    Top Up your Deposit Account
                  </div>

                  <div
                    className={`w-full py-3 bg-primary hover:bg-opacity-90 text-white text-lg font-medium rounded-full text-center flex justify-center items-center cursor-pointer`}
                    onClick={() => {
                      setModalInfo({
                        title: "Online Account",
                        type: "balance",
                      });
                      setModalOpened(true);
                    }}
                  >
                    Top Up your Online Account
                  </div>

                  {/* <button
                    disabled={true}
                    className={`w-full py-3 bg-primary hover:bg-opacity-90 disabled:bg-opacity-60 text-white text-lg font-medium rounded-full text-center flex justify-center items-center cursor-pointer`}
                    onClick={() => setModalOpened(true)}
                  >
                    Refund your Deposit Account
                  </button>

                  <button
                    disabled={true}
                    className={`w-full py-3 bg-primary hover:bg-opacity-90 disabled:bg-opacity-60 text-white text-lg font-medium rounded-full text-center flex justify-center items-center cursor-pointer`}
                    onClick={() => setModalOpened(true)}
                  >
                    Refund your Online Account
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalOpened && (
          <PaymentModal setModalOpened={setModalOpened} modalInfo={modalInfo} />
        )}
      </div>
    </>
  );
};

export default DashbordCompoent;
