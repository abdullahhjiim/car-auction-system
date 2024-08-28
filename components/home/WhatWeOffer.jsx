"use client";
import offer1 from "@/public/service1.png";
import offer2 from "@/public/service2.png";
import offer3 from "@/public/service3.png";
import { motion } from "framer-motion";
import Image from "next/image";

const ourOffers = [
  {
    img: offer1,
    title: "BUY A CAR",
    description:
      "Seamless, affordable car buying at Gulf Cars Auction—your hassle-free gateway to acquiring your dream ride effortlessly",
    link: "/",
  },

  {
    img: offer2,
    title: "SHIP MY CAR",
    description:
      "Get top-notch service at Gulf Cars Auction—swift, reliable, and tailored to meet your every need. Elevate your experience now",
    link: "/",
  },
  {
    img: offer3,
    title: "SELL MY CAR",
    description:
      "Easily sell your car at Gulf Cars Auction — A quick, hassle-free platform with optimal returns and simplicity",
    link: "/",
  },
];

const WhatWeOffer = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {ourOffers?.map((offer, i) => {
            const { img, title, description, link } = offer;
            return (
              <div
                className="relative text-white bg-[#1E1E1E] w-full px-16 py-10 rounded-[30px] overflow-hidden group z-10"
                key={i}
              >
                <motion.div
                  initial={{ y: -100 }}
                  whileInView={{ y: 0, transition: { duration: 1 } }}
                  className="absolute bottom-0 right-0 -z-10"
                >
                  <Image
                    src={img}
                    alt={title}
                    className="group-hover:scale-105 duration-500"
                  />
                </motion.div>
                <div className="max-w-[280px]">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-secondary uppercase font-bold">
                    {title}
                  </h4>
                  <motion.p
                    initial={{ x: -100 }}
                    whileInView={{ x: 0, transition: { duration: 1 } }}
                    className="mt-4 mb-6 text-lg"
                  >
                    {description}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
