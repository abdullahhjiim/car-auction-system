'use client';
import { authAxios } from '/app/(home)/axious-config';
import BookedVehicleTable from '@/components/admin/BookedVehicleTable';
import BreadCrumbs from '@/components/breadcrumb/BreadCrumbs';
import DashboardSidebar from '@/components/common/DashboardSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BookedVehicles = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const fetchData = (urlStr) => {
    setLoading(true);
    let url = urlStr ? `/my-booked-vehicles${urlStr}` : '/my-booked-vehicles';
    authAxios
      .get(url, {
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
    fetchData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText) => {
    if (searchText.length > 0) {
      fetchData(`?vehicle_global_search=${searchText}`);
    } else {
      fetchData(``);
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
                classProperty={`mb-8`}
                breadCumbsArr={[
                  { link: '/admin/dashboard', text: 'Dashboard' },
                  { link: '', text: 'Booked Vehicles' },
                ]}
              />
              <BookedVehicleTable
                name="Booked Vehicles"
                tableBodyData={data}
                handleSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookedVehicles;
