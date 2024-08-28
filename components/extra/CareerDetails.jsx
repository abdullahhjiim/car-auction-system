'use client';
import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useState } from 'react';
import ApplyJob from './ApplyJob';

const CareerDetails = ({ id }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/public-job-posts/${id}`)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-[800px]">
      {loading && <p>Loading...</p>}
      {!loading && data?.id && (
        <div className="job-posting p-8 bg-white rounded-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Job Title: {data?.job_title}
          </h2>

          <h3 className="text-lg font-semibold mb-2">
            Location: {data?.job_location}
          </h3>

          <h3 className="text-lg font-semibold mb-2">
            Company: Gulf Cars Auction
          </h3>

          <h3 className="text-sm font-semibold mb-2">
            Application Deadline: {data?.application_deadline_formatted}
          </h3>

          <div dangerouslySetInnerHTML={{ __html: data?.description }} />

          <div className="mt-6 flex justify-end">
            <ApplyJob jobId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetails;
