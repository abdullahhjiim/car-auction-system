"use client";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ meta, handlePagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const makePaginateArr = (number) => {
    let arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  };
  let paginateArr = makePaginateArr(meta?.last_page);

  return (
    <>
      {meta?.last_page > 1 && (
        <div className="flex items-center gap-x-1 mt-6">
          {meta.current_page != 1 && (
            <div
              onClick={() => handlePagination(meta.current_page - 1)}
              className="flex justify-center items-center w-11 h-11  bg-black bg-opacity-10 text-black hover:bg-primary hover:text-white hover:bg-opacity-100 rounded-md duration-500 cursor-pointer"
            >
              <FaArrowLeft />
            </div>
          )}

          {paginateArr.map((e) => {
            let styleCurrent =
              e === meta.current_page
                ? "bg-opacity-100 bg-primary"
                : "bg-opacity-10";
            return (
              <div
                key={e}
                onClick={() => handlePagination(e)}
                className={`flex justify-center items-center w-11 h-11 ${styleCurrent}  bg-black  text-black hover:bg-primary hover:text-white hover:bg-opacity-100 rounded-md duration-500 cursor-pointer font-bold`}
              >
                {e}
              </div>
            );
          })}

          {meta.current_page != meta.last_page && (
            <div
              onClick={() => handlePagination(meta.current_page + 1)}
              className="flex justify-center items-center w-11 h-11  bg-black bg-opacity-10 text-black hover:bg-primary hover:text-white hover:bg-opacity-100 rounded-md duration-500 cursor-pointer"
            >
              <FaArrowRight />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
