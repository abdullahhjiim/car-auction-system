"use client";
import AccountHeader from "@/components/common/AccountHeader";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import PayConfirmModal from "@/components/common/PayConfirmModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";

const PaymentDue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(false);
  const [invoiceIds, setInvoiceIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/pending-invoices`, {
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

  const handleChage = (event, index) => {
    const { checked } = event.target;
    const cloneData = [...data];
    cloneData[index].selected = checked;
    setData(cloneData);
  };

  const handleNextStep = (items) => {
    const amout = items.reduce(
      (prev, item) => prev + parseFloat(item.total_amount),
      0
    );

    setIsOpen(true);
    setTotalAmount(amout);
    let ids = [];
    items.map((element) => {
      ids.push(element.id);
    });

    setInvoiceIds(ids);
  };

  const selectedItems = data.filter((item) => item?.selected == true);

  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <AccountHeader type={"payment_due"} />
              <div className="flex justify-between">
                <h5 className="text-2xl md:text-3xl font-bold">Payment Due</h5>
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
                        className="px-1 py-3 min-w-[20px] text-center"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Invoice
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Vehicle
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Invoice Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 min-w-[120px] text-center"
                      >
                        Due Amount
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
                          key={item.id}
                        >
                          <td className="px-6 py-4 text-center">
                            {(item?.status == 2 || item?.status == 3) && (
                              <input
                                type="checkbox"
                                value={item?.selected}
                                onChange={(e) => handleChage(e, i)}
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.invoice_number}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item?.vehicle_title}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item?.total_amount}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.issue_date_formatted}
                          </td>

                          <td className="px-6 py-4 text-center">
                            {item?.status_name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {item?.due_amount}
                          </td>
                        </tr>
                      ))}

                    {selectedItems.length > 0 && (
                      <tr>
                        <td colSpan={2}>
                          <div className="m-3">
                            <button
                              onClick={() => handleNextStep(selectedItems)}
                              className="bg-primary px-2 py-1 rounded-md text-white hover:bg-opacity-70 duration-500"
                            >
                              {selectedItems?.length} item selected
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PayConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        totalAmount={totalAmount}
        invoiceIds={invoiceIds}
      />
    </>
  );
};

export default PaymentDue;
