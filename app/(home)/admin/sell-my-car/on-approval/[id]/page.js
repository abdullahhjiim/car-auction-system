/* eslint-disable @next/next/no-img-element */
'use client';
import BreadCrumbs from '@/components/breadcrumb/BreadCrumbs';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authAxios } from '/app/(home)/axious-config';

const ViewVehicle = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [vehicle, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/member-vehicles/${id}`, {
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
      <div className="py-8 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <BreadCrumbs
                breadCumbsArr={[
                  { link: '/admin/dashboard', text: 'Dashboard' },
                  {
                    link: '/admin/sell-my-car/on-approval',
                    text: 'On Approval Car',
                  },
                  { link: '', text: 'Detail' },
                ]}
              />
              <div className="shadow-2xl p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl text-primary m-2 font-semibold">
                    Vehicle Detail
                  </h1>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <div className="flex flex-col">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                              <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Vin :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.vin}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Year :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.year}
                                  </td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Make :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.make}
                                  </td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Model :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.model}
                                  </td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Color :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.color}
                                  </td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Lot Number :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.lot_number}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Odometer :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.odometer}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Mileage Type :
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.mileage_type}
                                  </td>
                                </tr>

                                {vehicle?.category_id == 2 && (
                                  <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                      Selling Price
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      {vehicle?.selling_price}
                                    </td>
                                  </tr>
                                )}

                                {vehicle?.category_id == 1 && (
                                  <>
                                    <tr className="border-b dark:border-neutral-500">
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Start Bid Amount :
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {vehicle?.start_bid_amount}
                                      </td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        Sale Type :
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {vehicle?.sale_type_name}
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                              <tbody>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Cylinder
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.cylinder}
                                  </td>
                                </tr>
                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Draive Train
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.drive_train}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Engine Type
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.engine_type}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Category
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.category_name}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Transmission
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.transmission}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Highlight
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.highlight}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Primary Damage
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.primary_damage}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Secondary Damage
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.secondary_damage}
                                  </td>
                                </tr>

                                <tr className="border-b dark:border-neutral-500">
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    Keys
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {vehicle?.keys_name}
                                  </td>
                                </tr>

                                {vehicle?.sale_type == 2 &&
                                  vehicle?.category_id == 1 && (
                                    <>
                                      <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                          Reserve Price
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          {vehicle?.reserve_amount}
                                        </td>
                                      </tr>
                                    </>
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

              {vehicle?.vehicle_images && (
                <div className="shadow-2xl p-2 rounded-md border border-gray-300 mt-6">
                  <h1 className="text-2xl text-primary m-2 font-semibold">
                    Vehicle Images
                  </h1>
                  <div className="p-2">
                    <div className="grid grid-cols-4 gap-4">
                      {vehicle?.vehicle_images &&
                        vehicle?.vehicle_images.map((element, i) => (
                          <div key={i}>
                            <img
                              src={element?.thumbnail_url}
                              alt="vehile-image"
                              className="rounded-md"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVehicle;
