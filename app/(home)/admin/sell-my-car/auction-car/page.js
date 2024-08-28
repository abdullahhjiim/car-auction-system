'use client';

import { authAxios } from '/app/(home)/axious-config';
import CarAuctionTable from '@/components/admin/CarAuctionTable';
import BreadCrumbs from '@/components/breadcrumb/BreadCrumbs';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuctionCars = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [meta, setMeta] = useState(null);

  const fetchData = (urlStr) => {
    setLoading(true);
    const url = urlStr
      ? `/member-vehicles/auction${urlStr}`
      : '/member-vehicles/auction';
    authAxios
      .get(url, {
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
    fetchData('?page=1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handlePangation = (currentPage) => {
    // setPage(currentPage);
    fetchData(`?page=${currentPage}`);
  };

  const handleSearch = (searchText) => {
    if (searchText.length > 0) {
      fetchData(`?page=1&vehicle_global_search=${searchText}`);
    } else {
      fetchData(`?page=1`);
    }
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
                breadCumbsArr={[
                  { link: '/admin/dashboard', text: 'Dashboard' },
                  { link: '', text: 'Auction Cars' },
                ]}
              />
              <CarAuctionTable
                name="Auction Cars"
                tableBodyData={data}
                token={token}
                handleSearch={handleSearch}
                dataLoading={loading}
                totalVehicle={`Total ${meta?.total} Cars`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionCars;
