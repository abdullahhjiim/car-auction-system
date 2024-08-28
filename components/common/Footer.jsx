"use client";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import apple from "@/public/apple-button.png";
import google from "@/public/google-button.png";
import logo from "@/public/logo-white.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const details = [
  {
    logo: <FaMapMarkerAlt />,
    text: process.env.NEXT_PUBLIC_MAP_ADDRESS,
    type: "",
  },
  {
    logo: <FaPhoneAlt />,
    text: process.env.NEXT_PUBLIC_NUMBER_2,
    type: "call",
  },
  {
    logo: <FaPhoneAlt />,
    text: process.env.NEXT_PUBLIC_NUMBER_1,
    type: "call",
  },
  {
    logo: <FaEnvelope />,
    text: process.env.NEXT_PUBLIC_EMAIL,
    type: "",
  },
];

const socialData = [
  {
    logo: <FaTiktok />,
    link: process.env.NEXT_PUBLIC_TIKTOK_URL,
  },
  {
    logo: <FaInstagram />,
    link: process.env.NEXT_PUBLIC_INSTRAGRAM_URL,
  },
  {
    logo: <FaFacebookF />,
    link: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
  {
    logo: <FaYoutube />,
    link: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  },
];

const resourcesData = [
  {
    text: "About",
    link: "/about-us",
  },
  {
    text: "Auctions",
    link: "/auctions",
  },

  {
    text: "Faq",
    link: "/faqs",
  },

  {
    text: "Privacy Policy",
    link: "/privacy-policy",
  },
];

const Footer = () => {
  const pathName = usePathname();

  if (pathName.startsWith("/live-auction") || pathName.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="bg-black text-white pt-6 md:pt-12">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0, transition: { duration: 1 } }}
          className="flex flex-col md:flex-row gap-4 sm:gap-12"
        >
          <div className="w-full md:w-1/3 flex flex-col justify-start text-center md:text-start items-center md:items-start">
            <div className="mx-auto md:mx-0">
              <Image
                src={logo}
                alt="brand logo of gulf car auction"
                className="max-w-[200px] h-auto"
              />
            </div>
            <p className="opacity-80 xl:pr-20 mt-5">
              Redefining Excellence with Affordable Quality and Unwavering Commitment to Customer
              Satisfaction
            </p>
          </div>

          <div className="w-full md:w-2/3 flex flex-col sm:flex-row justify-between gap-8 md:pl-12">
            <div>
              <h4 className="text-center md:text-left text-xl font-semibold text-primary">
                Resources
              </h4>
              <div className="h-[3px] w-28 bg-primary mt-0.5 mb-7 mx-auto md:mx-0" />
              {/* links */}
              <ul className="grid grid-cols-2 gap-2 max-w-[250px] mx-auto md:mx-0">
                {resourcesData.map((item, i) => (
                  <li className="text-lg font-medium hover:text-primary duration-300" key={i}>
                    <Link href={item.link}>{item.text}</Link>
                  </li>
                ))}
              </ul>

              {/* details */}
              <ul className="flex flex-col gap-y-3 my-4 md:my-10 ml-12 sm:ml-0">
                {details.map((detail, i) => (
                  <li className="flex items-center gap-x-2" key={i}>
                    <div className="text-primary">{detail.logo}</div>
                    {detail?.type === "call" ? (
                      <p className=" opacity-80">
                        <a href={`tel: ${detail?.text}`}>{detail.text}</a>
                      </p>
                    ) : (
                      <p className=" opacity-80">{detail.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-center md:text-left text-xl font-semibold text-primary">
                Download App
              </h4>
              <div className="h-[3px] w-36 bg-primary mt-1.5 mb-4 mx-auto md:mx-0" />
              <div className="flex justify-center md:justify-start gap-x-7">
                <Link href={process.env.NEXT_PUBLIC_PLAY_STORE}>
                  <Image src={google} alt="google play store image" />
                </Link>
                <Link href={process.env.NEXT_PUBLIC_APP_STORE}>
                  <Image src={apple} alt="apple app store image" />
                </Link>
              </div>

              <div className="hidden md:flex flex-col gap-y-2 mt-8">
                <h4 className="text-xl font-semibold text-primary">Opening Hours</h4>
                <div className="h-[3px] w-36 bg-primary -mt-1 mb-2" />

                <div className="flex justify-between">
                  <p className="font-medium">Fri</p>
                  <p className="font-medium text-end">24 Hours</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium">Sun - Thu</p>
                  <p className="font-medium text-end">6.00 am - 12.00 am</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium">Saturday</p>
                  <p className="font-medium text-end">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <hr className="mt-6 !border-red-700 !border-opacity-50" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p initial={{ x: -100 }} whileInView={{ x: 0, transition: { duration: 1 } }}>
            © Copyright {new Date().getFullYear()}, All Rights Reserved
          </motion.p>
          <ul className="flex items-center gap-x-4">
            {socialData.map((social, i) => (
              <motion.li
                initial={{ x: 100 }}
                whileInView={{
                  x: 0,
                  transition: { duration: 0.3 + (i + 0.5) },
                }}
                key={i}
              >
                <Link href={social.link} target="_blank">
                  <div className="p-2.5 flex justify-center items-center text-primary hover:-translate-y-2 duration-500 bg-white opacity-75 hover:opacity-100 rounded-full">
                    {social.logo}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
