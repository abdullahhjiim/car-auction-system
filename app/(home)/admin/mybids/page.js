'use client';
import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyBids = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get('/auctions/my-bids', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        setData(res.data?.data);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto shadow-light m-4 mt-8">
        <h4 className="p-2 text-2xl font-semibold text-center mb-2">
          My All Bids
        </h4>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-black-800 font-medium text-black dark:border-neutral-500 dark:bg-black-900">
                    <tr>
                      <th scope="col" className=" px-6 py-4">
                        Lot Number
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Year
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Make
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Model
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Location
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Sale Date
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Odometer
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Damage
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Current Bid
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        My Max Bid
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        Bid Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 &&
                      data.map((el, i) => {
                        return (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={i}
                          >
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {el?.lot_number}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.year}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.make}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.model}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.auction_yard_name}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.sale_date}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.odometer}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.primary_damage}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.current_bid_amount}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.my_max_bid}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {el?.bid_status_name}
                            </td>
                          </tr>
                        );
                      })}
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

export default MyBids;
