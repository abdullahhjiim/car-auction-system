'use client';

import { handleWatch } from '/app/(home)/utils/setWatchUnWatch';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LoginModal from '../login/login';

const WatchUnWatch = ({ data }) => {
  const [modal, setModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const watchUnwatchSet = (vehicleID, watch) => {
    if (token) {
      handleWatch(vehicleID, watch, token);
    } else {
      setModal(true);
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  return (
    <div>
      {data?.is_watched ? (
        <button
          onClick={() => watchUnwatchSet(data?.id, data?.is_watched)}
          className="border border-yellow-800 text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
        >
          <FaHeart />
        </button>
      ) : (
        <button
          onClick={() => watchUnwatchSet(data?.id, data?.is_watched)}
          className="border border-yellow-800 text-primary hover:bg-primary hover:text-white duration-300 rounded py-1.5 px-3 flex justify-center items-center gap-x-1"
        >
          <FaRegHeart />
        </button>
      )}

      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default WatchUnWatch;
