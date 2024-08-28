"use client";
import apple from "@/public/apple-button.png";
import google from "@/public/google-button.png";
import mobileMatrix from "@/public/mobile-matrix-1.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MobileApp = () => {
  return (
    <div className="bg-[url('/android_bg.png')] md:h-[480px] bg-cover bg-center">
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0, transition: { duration: 1 } }}
          className="absolute left-0 -top-32"
        >
          <Image src={mobileMatrix} alt="bg-image" />
        </motion.div>
        <div className="">
          <div className="flex justify-evenly items-center mb-12">
            <div className="w-1/2 pt-16">
              {/* <motion.h3
              initial={{ y: -100 }}
              whileInView={{ y: 0, transition: { duration: 1 } }}
              className="text-red-500 font-semibold text-2xl"
            >
              Mobile Application
            </motion.h3> */}
              <motion.h2
                initial={{ x: -100 }}
                whileInView={{ x: 0, transition: { duration: 1 } }}
                className="font-semibold md:text-4xl text-[16px] py-2 text-[#b11e24] md:mt-6"
              >
                Download our User-friendly and Well Organized Smartphone
                application from Google Play and Apple Store
              </motion.h2>
              <motion.p
                initial={{ y: 100 }}
                whileInView={{ y: 0, transition: { duration: 1 } }}
                className="md:text-sm text-[10px]"
              >
                Prepare yourself for an amazing Mobile App experience. It&apos;s
                here at your fingertips.
              </motion.p>
              <motion.div
                initial={{ y: -100 }}
                whileInView={{ y: 0, transition: { duration: 1 } }}
                className="flex mt-12 gap-2"
              >
                <Link href={process.env.NEXT_PUBLIC_PLAY_STORE} target="_blank">
                  <Image src={google} alt="google play store image" />
                </Link>
                <Link href={process.env.NEXT_PUBLIC_APP_STORE} target="_blank">
                  <Image src={apple} alt="apple app store image" />
                </Link>
              </motion.div>
            </div>
            <div className="">
              {/* <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0, transition: { duration: 1 } }}
              className="pt-16 pb-4"
            >
              <Image
                src={mobileApp}
                alt="mobile application image"
                height={400}
              />
            </motion.div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
