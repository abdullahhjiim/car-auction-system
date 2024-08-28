"use client";
import aboutImage from "@/public/about-car.png";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative py-20 md:py-32 bg-secondary bg-cover bg-left bg-no-repeat z-10">
      <Image
        src={aboutImage}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover hidden md:block -z-10"
      />
      <div className="absolute inset-0 bg-white bg-opacity-50 -z-10 block lg:hidden" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 lg:col-span-5" />
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-y-5 relative">
            <motion.h4
              initial={{ x: 150 }}
              whileInView={{ x: 0, transition: { duration: 1.5 } }}
              className="text-primary font-secondary font-semibold text-2xl"
            >
              About Us
            </motion.h4>
            <motion.h2
              initial={{ y: -150 }}
              whileInView={{ y: 0, transition: { duration: 1.5 } }}
              className="text-3xl md:text-5xl md:leading-snug font-bold font-secondary mb-2"
            >
              {/* Everything you need to build an Gulf Cars Auction. */}
              Welcome to Gulf Cars Auction
            </motion.h2>
            <motion.p
              initial={{ y: 150 }}
              whileInView={{ y: 0, transition: { duration: 1.5 } }}
              className="text-lg leading-8 font-secondary"
            >
              Where innovation, integrity, and excellence converge to redefine
              the automotive industry. As a premier destination for buying and
              selling vehicles, we take pride in offering a modern, transparent,
              and customer- centric experience.
            </motion.p>
            <motion.h1
              initial={{ y: 150 }}
              whileInView={{ y: 0, rotate: -12, transition: { duration: 1.5 } }}
              className="mt-0 lg:-mt-8 mb-11 -rotate-12 font-tertiary sm:pl-20 text-[#CACACA] text-6xl"
            >
              Gulf Cars auction
            </motion.h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
