"use client";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";

const PaymentHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/payment-history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <div className="flex justify-between">
                <h5 className="text-2xl md:text-3xl font-bold">
                  Payment History
                </h5>
                {/* <div>
          <select
            className="border-2 border-gray-500 p-1 rounded-md"
            name="date_range"
            id=""
          >
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 180 Days</option>
          </select>
        </div> */}
              </div>

              <div className="relative mt-4 overflow-x-auto shadow-light sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-x-auto">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Vin
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Invoice Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Account
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Payment Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td className="px-6 py-4 text-center" colSpan={9}>
                          Loading...
                        </td>
                      </tr>
                    )}
                    {!loading && data?.length == 0 && (
                      <tr>
                        <td className="px-6 py-4 text-center" colSpan={9}>
                          No record found
                        </td>
                      </tr>
                    )}
                    {!loading &&
                      data?.length > 0 &&
                      data.map((item, i) => (
                        <tr
                          className="odd:bg-white even:bg-orange-50 !bg-opacity-50 border-b"
                          key={i}
                        >
                          <td className="px-6 py-4 text-center">{item?.vin}</td>

                          <td className="px-6 py-4 text-center">
                            {item?.invoice_number}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item?.account_type}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.payment_date}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item?.amount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
