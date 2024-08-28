"use client";
import { useState } from "react";
import JobModal from "./JobModal";

const JobPosting = ({jobId}) => {
  const [modal, setModal] = useState(false);
  const setModalClose = () => {
    setModal(false);
  };

  return (
    <div className="">
      <button
        onClick={() => setModal(true)}
        className="px-2 py-1 bg-primary rounded-md text-white hover:bg-opacity-60 hover:text-black duration-500"
      >
        Apply Now
      </button>

      <JobModal modal={modal} setModalClose={setModalClose} jobId={jobId} />
    </div>
  );
};

export default JobPosting;
