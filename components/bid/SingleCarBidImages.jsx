/* eslint-disable @next/next/no-img-element */
"use client";

import ReactImageMagnify from "react-image-magnify";

import Image from "next/image";
import { useState } from "react";

const SingleCarBidImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageProps = {
    smallImage: {
      alt: "Vehicle Image",
      isFluidWidth: true,
      src: images[currentIndex]?.url,
    },
    largeImage: {
      src: images[currentIndex]?.url,
      width: 1200,
      height: 1200,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
    enlargedImagePosition: "over",
    className: "all-initial",
    enlargedImageClassName: "all-initial",
    enlargedImageContainerClassName: "all-initial",
    imageClassName: "all-initial",
    isHintEnabled: true,
    shouldHideHintAfterFirstActivation: false,
  };

  return (
    <>
      <div className="w-full h-auto">
        <div className="relative">
          <ReactImageMagnify {...imageProps} />
          {currentIndex + 2 <= images.length && (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="absolute top-[45%] right-0 bg-primary text-white p-2 rounded-md cursor-pointer hover:bg-opacity-60 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          )}
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="absolute top-[45%] left-0 bg-primary text-white p-2 rounded-md cursor-pointer hover:bg-opacity-60 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-10 mb-4 grid grid-cols-5 gap-2 h-auto overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-md cursor-pointer `}
            >
              <Image
                src={image?.thumbnail_url}
                alt="banner"
                className={`w-full object-cover rounded-md ${
                  currentIndex === index ? "border-2 border-red-400" : ""
                }`}
                height={80}
                width={80}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleCarBidImages;
