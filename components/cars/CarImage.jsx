/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

const CarImage = ({ images }) => {

 const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    setSelectedImage(images ? images[0] : {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const imageProps = {
    smallImage: {
      alt: "Vehicle photo",
      isFluidWidth: true,
      src: selectedImage ? selectedImage?.url : null,
    },
    largeImage: {
      src: selectedImage? selectedImage?.url : null,
      width: 1000,
      height: 1000
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
    className: 'all-initial',
    enlargedImageClassName: 'all-initial',
    enlargedImageContainerClassName: 'all-initial',
    imageClassName: 'all-initial'
  };

  return (
    <>
      <div className="w-full h-auto">
            
        <ReactImageMagnify {...imageProps} />

        <div className="mt-10 mb-10 grid grid-cols-4 gap-2 h-[230px] overflow-y-auto">
          {images && images.map((image, index) => (
            <div key={image.url} onClick={() => setSelectedImage(image)} className={`rounded-md cursor-pointer `}>
              <Image
                src={image?.thumbnail_url}
                alt="banner"
                className={`w-full object-cover rounded-md ${ selectedImage?.url === image.url ? "border-2 border-red-400" : ''}`}
                height={400}
                width={400}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarImage;
