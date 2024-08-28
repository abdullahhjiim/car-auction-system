"use client";

import logo from "@/public/logo.png";
import whatsappBg from "@/public/whatsapp-bg.png";
import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const FloatingWhatsapp = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={`fixed bottom-8  z-[1000] left-4`}>
      {/* <Image
        src={WhatsappIcon}
        alt="whatsapp"
        className="w-16 h-16 rounded-full object-cover cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      /> */}

      {active && (
        <div
          className={`absolute left-[25px] sm:left-[10px] -top-[450%] w-[330px] sm:w-[350px] h-[280px] rounded-lg overflow-hidden z-[1000] black-shadow`}
        >
          <div className="relative bg-[#0A5F54] p-4 flex justify-start items-center gap-x-3">
            <FaTimes
              className="absolute top-3 right-3 text-white cursor-pointer hover:scale-110 duration-300"
              onClick={() => setActive(false)}
            />
            <div>
              <Image
                src={logo}
                alt="logo"
                className="w-16 h-16 rounded-full object-cover shadow-md bg-white p-2"
              />
            </div>
            <div className="text-white">
              <h5 className="text-lg font-bold -mb-1">Gulf Auction</h5>
              <p className="text-[12px] opacity-75">
                Typically replies within a day
              </p>
            </div>
          </div>

          <div className="py-3 px-4 relative">
            <Image
              src={whatsappBg}
              alt="whatsappbg"
              className="absolute inset-0 bg-cover w-full h-full"
            />
            <div className="bg-white rounded-md max-w-[200px] p-2.5 relative flex flex-col">
              <p className="font-semibold text-sm opacity-75 text-gray-600">
                Gulf Auction
              </p>
              <p className="text-gray-900 opacity-85">Hi there!</p>
              <p className="text-gray-900 opacity-85">How can I help you?</p>
            </div>
          </div>

          {/* <div className="bg-white py-4 px-3 rounded-b-md">
            <a
              href="https://wa.me/01638719578"
              target="_blank"
              className="w-full bg-[#4DC247] py-2 flex justify-center items-center gap-x-2 text-sm text-white rounded-full"
            >
              <FaWhatsapp /> Start Chat
            </a>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default FloatingWhatsapp;
