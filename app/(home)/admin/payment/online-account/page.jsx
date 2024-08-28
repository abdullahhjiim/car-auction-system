"use client";
import AccountHeader from "@/components/common/AccountHeader";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import PaymentTable from "@/components/common/paymentTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";

const OnlineAccount = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const fetchData = (urlStr) => {
    setLoading(true);
    authAxios
      .get(`/payment-receipts?type=online${urlStr}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res?.data?.data);
        setMeta(res?.data?.meta);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText) => {
    fetchData(`&payment_global_search=${searchText}`);
  };

  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <AccountHeader type={"online"} />
              <PaymentTable
                name="Online Account"
                tableBodyData={data}
                dataLoading={loading}
                handleSearch={handleSearch}
              />
              {/* <Pagination meta={meta} handlePagination={_handlePangation} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineAccount;
