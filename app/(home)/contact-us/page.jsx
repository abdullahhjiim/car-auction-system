import ContactForm from "@/components/common/ContactForm";
import GoogleMap from "@/components/common/GoogleMap";
import OpeningHours from "@/components/common/OpeningHours";
import banner from "@/public/banner1.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaEnvelope, FaFax, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const dummyData = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Find Us",
    desc: process.env.NEXT_PUBLIC_MAP_ADDRESS,
    type: "https://maps.app.goo.gl/psv3aWEbSRoLgSzN7",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    desc: process.env.NEXT_PUBLIC_NUMBER_1,
    type: "tel",
  },
  {
    icon: <FaEnvelope />,
    title: "Mail Us",
    desc: process.env.NEXT_PUBLIC_EMAIL,
    type: "mailto",
  },
  {
    icon: <FaFax />,
    title: "Fax",
    desc: process.env.NEXT_PUBLIC_FAX,
    type: "",
  },
];

export const metadata = {
  title: "GCA | Contact Us",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const ContactUs = () => {
  return (
    <>
      <div>
        <div className="relative flex justify-center items-center py-24 min-h-[20vh] sm:min-h-[20vh] z-1 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 -z-[1]" />
          <div className="absolute inset-0 w-full h-full -z-[2]">
            <Image
              src={banner}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4">
            <h4 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
              Contact Us
            </h4>
          </div>
        </div>

        <div className="bg-secondary bg-opacity-30 pt-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              {/* <p className="text-primary uppercase text-base">{`LET'S GET IN TOUCH!`}</p> */}
              <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold">{`We’d Love to Hear From You`}</h4>
              <p className="mt-2 p-2">
                Welcome to Gulf Cars Auction, where your inquiries and feedback
                are invaluable to us. We strive to provide you with exceptional
                service and support to ensure that your interactions with us are
                seamless and satisfying.
              </p>
            </div>

            <div className="flex flex-wrap items-center py-8">
              {dummyData.map((item, i) => (
                <div
                  className="w-full sm:w-1/2 lg:w-1/4 p-4 flex items-center gap-3"
                  key={i}
                >
                  <div className="text-primary text-2xl">{item.icon}</div>
                  <div>
                    <h5 className="text-primary text-xl font-bold">
                      {item.title}
                    </h5>
                    {item.title === "Find Us" ? (
                      <Link href={item.type} passHref legacyBehavior>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-60 text-sm block"
                        >
                          {item.desc}
                        </a>
                      </Link>
                    ) : (
                      <Link href={`${item.type}:${item.desc}`}>
                        <p className="opacity-60 text-sm">{item.desc}</p>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-10 my-12">
              <div className="w-full lg:w-1/2">
                <OpeningHours />
              </div>
              <div className="w-full lg:w-2/3">
                <Suspense fallback={<div className="loading">Loading...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
          <GoogleMap />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
