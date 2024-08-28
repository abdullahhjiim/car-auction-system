"use client";

import { useState } from "react";
// Import Swiper
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SingleCarBidImages = ({ imgArr, lot_number }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: true,
        // }}
        modules={[FreeMode, Autoplay, Thumbs, Navigation]}
        className="mySwiper2 mb-2"
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {imgArr?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.thumbnail_url}
              alt="car"
              className="w-full max-h-[400px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper grid grid-cols-5 gap-2"
      >
        {imgArr?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.thumbnail_url}
              alt="car"
              className="max-h-[100px] w-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="mt-2 bg-primary text-white p-2 rounded-md"
        onClick={() => setModalIsOpen(true)}
      >
        View All Photos
      </button>

      <Dialog open={modalIsOpen} size="md" handler={handleOpen}>
        <DialogHeader>
          <div className="flex flex-row justify-between w-full">
            <h1>All Photos</h1>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-primary text-white p-2 rounded-md text-sm hover:opacity-60"
            >
              Close
            </button>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-2 overflow-y-auto h-[700px]">
            {imgArr?.map((item, i) => (
              <div key={i}>
                <img
                  src={item.thumbnail_url}
                  alt="car"
                  className="w-full object-cover rounded-xl cursor-pointer"
                />
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SingleCarBidImages;
