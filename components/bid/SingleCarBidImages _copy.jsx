/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SingleCarBidImages = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      activeIndex === images.length - 1
        ? setActiveIndex(0)
        : setActiveIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center rounded-md">
        {images[activeIndex]?.thumbnail_url && (
          <Image
            src={images[activeIndex]?.thumbnail_url}
            alt="vehicle-image"
            width={600}
            height={300}
            className="max-h-[400px] rounded-xl"
          />
        )}
      </div>

      <div className="grid grid-cols-6 lg:grid-cols-6 gap-2 mt-6 max-h-[200px] md:max-h-[250px] lg:max-h-[240px] overflow-y-auto p-2">
        {images.map((image, i) => (
          <Image
            key={i}
            src={image?.thumbnail_url}
            alt="car1"
            width={200}
            height={150}
            className={`${
              activeIndex === i
                ? "outline outline-offset-2 outline-2 outline-primary"
                : ""
            } w-full h-auto object-cover rounded-md`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </>
  );
};

export default SingleCarBidImages;
