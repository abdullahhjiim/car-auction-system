"use client";

import CarList from "@/components/cars/CarList";
import Pagination from "@/components/cars/Pagination";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import { useEffect, useState } from "react";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";

const MyWishlist = () => {
  const [isGrid, setIsGrid] = useState(false);
  const [lotData, setLotData] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const fetchData = (currentPage) => {
    setLoading(true);

    let url = currentPage
      ? `/vehicles/watched-vehicles?page=${currentPage}`
      : `/vehicles/watched-vehicles`;
    authAxios
      .get(url)
      .then((res) => {
        setLotData(res.data.data);
        setMeta(res.data.meta);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const _handlePangation = (currentPage) => {
    setPage(currentPage);
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
              <div>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h5 className="font-semibold text-lg">
                    We Found{" "}
                    <span className="font-bold text-primary text-xl">
                      {lotData?.length}
                    </span>{" "}
                    cars available for you
                  </h5>
                  <div className="flex justify-center items-center gap-x-2">
                    <IoGrid
                      className={`hover:text-primary cursor-pointer ${
                        isGrid && "text-primary"
                      }`}
                      size={20}
                      onClick={() => setIsGrid(true)}
                    />
                    <FaThList
                      className={`hover:text-primary cursor-pointer ${
                        !isGrid && "text-primary"
                      }`}
                      size={20}
                      onClick={() => setIsGrid(false)}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <CarList
                    isGrid={isGrid}
                    lotData={lotData}
                    loading={false}
                    token={token}
                  />
                </div>
                <Pagination meta={meta} handlePagination={_handlePangation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWishlist;
