/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ReactTyped } from "react-typed";
import { authAxios } from "/app/(home)/axious-config";

const Hero = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/hero-banners`)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push("/registration?step=4");
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  return (
    <div className="">
      {loading && <div className="h-[55vh] bg-gray-400"> </div>}
      {!loading && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
        >
          {data &&
            data.map((item) => (
              <div className="relative h-[70vh]" key={item.id}>
                <img
                  src={item?.banner_url}
                  alt="hero"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                <div className="absolute inset-0 bg-black bg-opacity-45 -z-10" />
                <div className="container mx-auto px-4 py-16">
                  <div className="max-w-[600px] text-white text-center flex flex-col justify-center items-center gap-y-3 md:gap-y-5 mx-auto">
                    <h2 className="text-3xl md:text-5xl md:leading-[70px] uppercase font-bold">
                      Distinctive Values, Endless
                      <ReactTyped
                        backSpeed={50}
                        strings={[" Opportunities", " Dream Cars"]}
                        typeSpeed={140}
                        loop
                        style={{
                          display: "inline-block",
                          color: "#b20a0b",
                          marginLeft: "3px",
                        }}
                      />
                    </h2>
                    <p className="text-lg font-secondary ">
                      Unlock unique opportunities in the dynamic world of Gulf
                      Cars Auction, connecting buyers and sellers for exclusive
                      transactions
                    </p>
                    <Link href={"/all-vehicle"}>
                      <button className="bg-primary text-white font-secondary font-medium rounded-full flex items-center justify-center gap-x-3 pl-5 pr-2 py-1 hover:translate-x-4 duration-500">
                        View Cars
                        <div className="inline-block p-4 bg-white rounded-full text-primary">
                          <FaArrowRight />
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default Hero;
