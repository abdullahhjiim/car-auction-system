'use client';
import { authAxios } from '/app/(home)/axious-config';
import BidsStatusTable from '@/components/admin/BidsStatusTable';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const tableHeadData = [
  {
    title: 'Image',
  },
  {
    title: 'VIN',
  },
  {
    title: 'Year',
  },
  {
    title: 'Make',
  },
  {
    title: 'Model',
  },
  {
    title: 'Damage',
  },
  {
    title: 'Highlight',
  },
  {
    title: 'Status',
  },
];

const NotWinningPrebids = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/member-vehicles`, {
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
              <BidsStatusTable
                name="Not Winning Prebids"
                tableHeadData={tableHeadData}
                tableBodyData={data}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotWinningPrebids;
