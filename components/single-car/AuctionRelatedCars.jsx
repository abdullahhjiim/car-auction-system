/* eslint-disable @next/next/no-img-element */
'use client';

import { authAxios } from '/app/(home)/axious-config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const AuctionRelatedCars = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(url)
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
    <div className="mt-12 pb-30">
      {data.length > 0 && (
        <h4 className="text-2xl md:text-4xl font-bold mb-6">
          Other vehicles of this auction
        </h4>
      )}
      <div className="relative">
        <button className="arrow-left absolute top-24 md:top-[150px] left-0 md:-left-6 bg-gray-100 w-11 h-11 rounded-full shadow-xl flex items-center justify-center z-[1000] hover:bg-primary hover:text-white duration-500">
          <FaArrowLeft size={20} />
        </button>
        <button className="arrow-right absolute top-24 md:top-[150px] right-0 md:-right-6 bg-gray-100 w-11 h-11 rounded-full shadow-xl flex items-center justify-center z-[1000] hover:bg-primary hover:text-white duration-500">
          <FaArrowRight size={20} />
        </button>

        <Swiper
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {data.map((item, i) => {
            const { title, vin, lot_number, location, thumbnail_url } = item;
            return (
              <SwiperSlide
                className="border border-primary border-opacity-20  rounded-md overflow-hidden"
                key={i}
              >
                <img
                  src={thumbnail_url}
                  alt="car"
                  className="w-full"
                  style={{ maxHeight: '280px' }}
                />
                <div className="p-3 flex flex-col gap-1">
                  <h4 className="font-semibold text-lg">{title}</h4>
                  <p>Lot: {lot_number}</p>
                  <p>VIN: {vin}</p>
                  <p>Location: {location}</p>
                </div>
                <div className="flex justify-between items-center gap-2 p-3">
                  <Link href={`/all-vehicle/${lot_number}`}>
                    <button className="flex justify-center items-center gap-x-1 bg-primary text-white hover:bg-opacity-90 rounded-lg py-2 px-3">
                      View Detail <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default AuctionRelatedCars;
