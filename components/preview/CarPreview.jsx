/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CarPreview = ({ images, saleText }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {images && images.length > 0 && (
        <div className="w-full h-auto relative">
          {saleText && (
            <div className="absolute top-[30%] left-[30%] z-10">
              <h4 className="text-green-500 text-9xl uppercase">{saleText}</h4>
            </div>
          )}
          <Swiper
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Autoplay, Thumbs, Navigation]}
            className="mySwiper max-h-[450px] rounded-md overflow-hidden"
          >
            {images.map((image, i) => {
              return (
                <SwiperSlide className="overflow-hidden" key={i}>
                  <Image
                    src={image?.url}
                    alt="vehicle image"
                    height={400}
                    width={400}
                    className={`w-full rounded-md object-cover ${
                      saleText ? "blur" : ""
                    }`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper grid grid-cols-4 gap-2 m-2 !p-2"
          >
            {images?.map((item, i) => (
              <SwiperSlide key={i}>
                <img
                  src={item.thumbnail_url}
                  alt="car"
                  className="max-h-[100px] w-full object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default CarPreview;
