/* eslint-disable @next/next/no-img-element */
"use client";
import banner2 from "@/public/banner2.png";
import banner4 from "@/public/banner4.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { authAxios } from "/app/(home)/axious-config";

const downloads = [
  {
    title: "There is some title for download",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, ipsa deserunt optio ducimus id consequatur vel nobis voluptatum? Consectetur, animi? Eligendi, consequuntur quibusdam autem, possimus perspiciatis eveniet inventore natus totam vero amet repellat. Esse vero fuga asperiores iusto voluptatum. Nihil voluptatem expedita ipsam cupiditate sit adipisci, possimus aut facilis totam earum unde, dolorum repellat sed qui obcaecati velit quae veniam, necessitatibus assumenda voluptas eius corrupti officia laboriosam? Dignissimos quisquam nulla saepe odio asperiores iusto, reiciendis voluptatibus vitae voluptas autem animi odit repellendus fugit eveniet voluptatem neque, perferendis quis totam doloremque eaque dolor obcaecati provident sit. Quo esse voluptatem nobis earum dolore nemo natus mollitia maiores nihil, voluptatum aut officia omnis atque deserunt dolor vitae, odio quis sit commodi quidem labore tempora ipsa necessitatibus! Fugit dolore eligendi vitae harum minus delectus quaerat libero, sapiente dolor reprehenderit expedita corrupti quidem, molestias cupiditate officiis aut labore neque debitis quos sequi dignissimos, ad repellendus.",

    image: banner2,
    downloadLink: "",
  },
  {
    title: "Another Title of the download section",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. kthbos Voluptate cupiditate neque, odio, doloribus labore maxime eligendi sed aperiam vitae, dolore veniam ",
    image: banner4,
    downloadLink: "",
  },
];

const DownloadCom = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get("/public-downloads")
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-secondary bg-opacity-30 py-4 md:py-24">
      <div className="container mx-auto px-4">
        {loading && <p>Loading...</p>}
        {!loading &&
          data &&
          data.map((item, index) => {
            let isEven = index % 2 == 0;
            let dynamicClass = isEven ? "sm:flex-row" : "sm:flex-row-reverse";
            return (
              <div
                className={`flex flex-col ${dynamicClass} gap-6 sm:gap-11 md:gap-20 items-center py-12`}
                key={index}
              >
                <div className="w-full sm:w-1/2">
                  <motion.div
                    initial={{
                      x: isEven ? -100 : 100,
                    }}
                    whileInView={{
                      x: 0,
                      transition: {
                        duration: 1.5,
                      },
                    }}
                  >
                    <div className="p-[50px]">
                      <img
                        src={item?.photo}
                        alt="cars"
                        height={200}
                        width={200}
                        className="text-center w-full"
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="w-full sm:w-1/2 lg:pl-12">
                  <motion.h2
                    initial={{
                      y: -100,
                    }}
                    whileInView={{
                      y: 0,
                      transition: {
                        duration: 1,
                      },
                    }}
                    className="font-bold text-2xl sm:text-2xl md:text-3xl !leading-snug mb-4"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.div
                    initial={{
                      x: isEven ? 100 : -100,
                    }}
                    whileInView={{
                      x: 0,
                      transition: {
                        duration: 1.3,
                      },
                    }}
                    className="opacity-75"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  </motion.div>
                  <div className="flex justify-end mt-2">
                    <motion.a
                      initial={{
                        y: 100,
                      }}
                      whileInView={{
                        y: 0,
                        transition: {
                          duration: 1.5,
                        },
                      }}
                      href={item?.attachment}
                      target="_blank"
                      className="flex items-center gap-2 hover:text-black bg-primary px-2 py-1 text-white rounded-md hover:bg-opacity-70 duration-500"
                    >
                      {" "}
                      <FaCloudDownloadAlt /> Download
                    </motion.a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DownloadCom;
