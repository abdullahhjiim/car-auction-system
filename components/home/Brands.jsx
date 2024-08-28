"use client";
import carShape from "@/public/car-shape.png";
import lineAbstract from "@/public/line-abstract.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { authAxios } from "/app/(home)/axious-config";

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/top-makes-with-count`)
      .then((res) => {
        setLoading(false);
        setBrands(res?.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-secondary py-20">
      <div className="container px-4 mx-auto">
        <div className="relative text-center">
          <div className="absolute -top-[100%] md:-top-[130%] left-1/2 -translate-x-1/2">
            <Image src={carShape} alt="car" />
          </div>
          <motion.h4
            initial={{ y: 100 }}
            whileInView={{ y: 0, transition: { duration: 1 } }}
            className="text-2xl md:text-4xl xl:text-5xl font-bold mb-4"
          >
            Top Car Brands
          </motion.h4>
        </div>
        <div className="text-center">
          <motion.div
            initial={{ y: -100 }}
            whileInView={{ y: 0, transition: { duration: 1 } }}
            className="flex justify-center items-center mb-10"
          >
            <Image src={lineAbstract} alt="line" />
          </motion.div>

          <div className="relative z-10">
            <button className="arrow-left absolute md:top-[55px] top-[45px] left-0 md:-left-12 bg-gray-100 w-11 h-11 rounded-full shadow-xl flex items-center justify-center z-[1000] hover:bg-primary hover:text-white duration-500">
              <FaArrowLeft size={20} />
            </button>
            <button className="arrow-right absolute md:top-[55px] top-[45px] right-0 md:-right-6 bg-gray-100 w-11 h-11 rounded-full shadow-xl flex items-center justify-center z-[1000] hover:bg-primary hover:text-white duration-500">
              <FaArrowRight size={20} />
            </button>

            <Swiper
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
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
                  slidesPerView: 6,
                  spaceBetween: 40,
                },
              }}
              navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
              modules={[FreeMode, Autoplay, Thumbs, Navigation]}
              className="mySwiper"
            >
              {brands.map((brand, i) => {
                return (
                  <SwiperSlide className="overflow-hidden" key={i}>
                    <div className="flex flex-col justify-center items-center">
                      <Link
                        href={`/all-vehicle?make_ids=${brand?.id}`}
                        target="_blank"
                        key={i}
                        className="group w-40 h-40 p-4 m-1 bg-[#fff] border-2 border-gray-100 ring-4 ring-white transition duration-500 rounded-full flex justify-center items-center hover:bg-gray-200"
                      >
                        <Image
                          src={brand.logo}
                          alt="brand"
                          height={90}
                          width={120}
                          className="rounded-full w-full group-hover:scale-125 duration-500"
                        />
                      </Link>
                      <div className="flex gap-2 mt-2">
                        <Link
                          href={`/all-vehicle?make_ids=${brand?.id}`}
                          className={`inline-flex items-center justify-center uppercase rounded-md min-w-[80px] bg-[#b11e24] text-white  px-2 py-1 text-xs font-medium`}
                        >
                          {brand?.name} ({brand?.vehicles_count})
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
