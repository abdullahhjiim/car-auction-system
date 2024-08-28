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
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarItemLoader from "./CarItemLoader";
import { authAxios } from "/app/(home)/axious-config";

const BuyNowVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get("/lot/buy-now-vehicles?limit=6")
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  console.log(data);

  return (
    <div className="pt-20 sm:pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="relative">
            <div className="absolute -top-[50%] md:-top-[130%] left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ y: 100 }}
                whileInView={{ y: 0, transition: { duration: 1 } }}
              >
                <Image src={carShape} alt="car" />
              </motion.div>
            </div>
            <motion.h4
              initial={{ y: -100 }}
              whileInView={{ y: 0, transition: { duration: 1 } }}
              className="text-2xl md:text-4xl xl:text-5xl font-bold mb-6"
            >
              Buy now Vehicle.
            </motion.h4>
          </div>
          <motion.h4
            initial={{ x: -100 }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
            className="text-[#90A3BF] font-secondary text-2xl"
          >
            Instant Buy now Car
          </motion.h4>
          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
            className="flex justify-center items-center mt-4 mb-10"
          >
            <Image src={lineAbstract} alt="line" />
          </motion.div>
        </div>

        {/* cars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-6">
          {loading ? (
            <>
              <CarItemLoader />
              <CarItemLoader />
              <CarItemLoader />
              <CarItemLoader />
              <CarItemLoader />
              <CarItemLoader />
            </>
          ) : (
            <>
              {data?.length === 0 ? (
                <p className="text-lg font-medium">No Cars Found!</p>
              ) : (
                <>
                  {data?.map((item, i) => {
                    const { lot_number, vehicle_images, title, selling_price } =
                      item;

                    return (
                      <div
                        className="relative rounded-2xl overflow-hidden group"
                        key={i}
                      >
                        <Swiper
                          modules={[Navigation]}
                          navigation={{
                            nextEl: ".arrow-right",
                            prevEl: ".arrow-left",
                          }}
                          className="mySwiper relative overflow-hidden "
                        >
                          <div className="flex gap-x-2 justify-center items-center absolute top-5 right-5 z-[1000] opacity-0 group-hover:opacity-100 duration-500">
                            <button className="arrow-left bg-white p-3 rounded-full hover:bg-primary hover:text-white duration-300 opacity-100">
                              <FaArrowLeft size={11} />
                            </button>

                            <button className="arrow-right bg-white p-3 rounded-full hover:bg-primary hover:text-white duration-300 opacity-100">
                              <FaArrowRight size={11} />
                            </button>
                          </div>

                          {selling_price && (
                            <div className="flex gap-x-2 justify-center items-center absolute top-2 left-2 z-[1000] opacity-100 duration-500">
                              <p className="bg-white px-1.5 py-1 font-semibold rounded text-sm text-primary">
                                Price: AED {selling_price}
                              </p>
                            </div>
                          )}

                          {vehicle_images &&
                            vehicle_images.length > 0 &&
                            vehicle_images?.map((car, j) => (
                              <SwiperSlide
                                key={j}
                                className="relative z-10 w-full rounded-2xl overflow-hidden cursor-pointer"
                              >
                                <Link href={`/all-vehicle/${lot_number}`}>
                                  <div className="absolute inset-0 -z-10 text-center bg-black bg-opacity-10" />
                                  <div className="flex  justify-center items-center -z-20 relative bg-cyan-150 overflow-hidden">
                                    <Image
                                      width={300}
                                      height={200}
                                      src={car.thumbnail_url}
                                      alt="car"
                                      className="group-hover:scale-105 duration-500 cursor-pointer object-cover w-full h-[250px] sm:h-[300px] -z-10"
                                    />
                                  </div>
                                </Link>
                              </SwiperSlide>
                            ))}
                          {vehicle_images && vehicle_images.length === 0 && (
                            <SwiperSlide
                              key={i}
                              className="relative z-10 w-full rounded-2xl overflow-hidden cursor-pointer"
                            >
                              <Link href={`/all-vehicle/${lot_number}`}>
                                <div className="absolute inset-0 -z-10 text-center bg-black bg-opacity-10" />
                                <div className="flex justify-center items-center -z-20 relative">
                                  <Image
                                    width={300}
                                    height={200}
                                    src={item.thumbnail_url}
                                    alt="car"
                                    className="w-full max-h-[300px] object-cover -z-10"
                                  />
                                </div>
                              </Link>
                            </SwiperSlide>
                          )}
                        </Swiper>

                        <div className="relative bottom-12 px-3 z-10 cursor-pointer">
                          <Link href={`/all-vehicle/${lot_number}`}>
                            <h4
                              className="text-white font-secondary text-xl font-bold capitalize "
                              title={title}
                            >
                              {title}
                            </h4>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNowVehicle;
