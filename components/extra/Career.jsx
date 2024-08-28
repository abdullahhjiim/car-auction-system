"use client";
import nojob from "@/public/nojobs.gif";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { authAxios } from "/app/(home)/axious-config";

const Career = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/public-job-posts`)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[700px] overflow-hidden">
      {loading && <p>Loading...</p>}
      {!loading && data.length == 0 && (
        <div className="">
          <Image src={nojob} alt="no job image" />
        </div>
      )}
      {!loading &&
        data &&
        data.map((job, index) => {
          let even = index % 2 === 0;
          return (
            <motion.div
              initial={{
                x: even ? -100 : 100,
              }}
              whileInView={{
                x: 0,
                transition: {
                  duration: 1,
                },
              }}
              key={index}
              className="flex items-center gap-16 justify-between bg-white p-4 rounded-md shadow-2xl mb-4"
            >
              <div className="">
                <h3 className="text-xl font-semibold mb-2">{job.job_title}</h3>
                <div className="flex gap-4">
                  <p className="text-gray-600 font-semibold text-sm">
                    {job.job_location},
                  </p>
                  <p className="text-gray-600 font-semibold text-sm">
                    {" "}
                    Deadline: {job.application_deadline}
                  </p>
                </div>
              </div>
              <Link
                href={`/careers/${job.id}`}
                className="flex items-center gap-2 text-primary hover:underline tracking-tight	text-sm"
              >
                See Detail <FaArrowRightLong />
              </Link>
            </motion.div>
          );
        })}
    </div>
  );
};

export default Career;
