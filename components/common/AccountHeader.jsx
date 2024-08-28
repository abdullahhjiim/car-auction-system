"use client";
import { authAxios } from "@/app/(home)/axious-config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AccountHeader = ({ type }) => {
  const { token } = useSelector((state) => state.auth);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccountData = async () => {
      setLoading(true);

      const res = await authAxios.get(`/balance-summary?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAccounts(res?.data?.data);
      setLoading(false);
    };

    getAccountData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {accounts?.length > 0 && (
        <div className={`flex gap-4 mb-8`}>
          {accounts.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-full max-w-[480px] p-4 bg-primary rounded-xl text-white text-center shadow-light"
              >
                <h5 className="text-lg font-semibold">{item?.title}</h5>
                <p className="my-2">
                  <span className="font-bold text-2xl">{item.amount}</span> AED
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AccountHeader;
