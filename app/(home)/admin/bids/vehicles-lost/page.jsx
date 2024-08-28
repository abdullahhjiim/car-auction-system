'use client';
import { authAxios } from '/app/(home)/axious-config';
import VehicleLostWon from '@/components/admin/VehicleLostWon';
import BreadCrumbs from '@/components/breadcrumb/BreadCrumbs';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const VehicleLost = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const getData = (params) => {
    setLoading(true);
    authAxios
      .get(`/auctions/lot-lost${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData('?date_range=last_30_days');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDaysRange = (e) => {
    getData(`?date_range=${e.target.value}`);
  };

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
                classProperty={`mb-8`}
                breadCumbsArr={[
                  { link: '/admin/dashboard', text: 'Dashboard' },
                  { link: '', text: 'Vehicle Lost' },
                ]}
              />
              <VehicleLostWon
                name="Vehicle Lost"
                tableBodyData={data}
                setDaysRange={setDaysRange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleLost;
