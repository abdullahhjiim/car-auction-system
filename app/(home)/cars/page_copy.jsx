'use client';

import React, { useState } from 'react';
import CarList from '@/components/cars/CarList';
import CarSidebar from '@/components/cars/CarSidebar';
import Pagination from '@/components/cars/Pagination';

import { IoGrid } from 'react-icons/io5';
import { FaThList } from 'react-icons/fa';

const Cars = () => {
  const [isGrid, setIsGrid] = useState(false);
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 lg:gap-11">
          <div className="col-span-3 lg:col-span-1">
            <CarSidebar />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <h5 className="font-semibold text-lg">
                  We Found{' '}
                  <span className="font-bold text-primary text-xl">5</span> cars
                  available for you
                </h5>
                <div className="flex justify-center items-center gap-x-2">
                  <IoGrid
                    className={`hover:text-primary cursor-pointer ${
                      isGrid && 'text-primary'
                    }`}
                    size={20}
                    onClick={() => setIsGrid(true)}
                  />
                  <FaThList
                    className={`hover:text-primary cursor-pointer ${
                      !isGrid && 'text-primary'
                    }`}
                    size={20}
                    onClick={() => setIsGrid(false)}
                  />
                </div>
              </div>
              <div className="mt-8">
                <CarList isGrid={isGrid} />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
