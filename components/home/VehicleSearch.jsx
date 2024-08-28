"use client";

import carAbstract from "@/public/car-abstract.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { authAxios } from "/app/(home)/axious-config";
import { customOptions } from "/app/(home)/utils/makeOptions";

const yearsData = [];

for (let i = 2024; i >= 1990; i--) {
  yearsData.push({ value: i + "-" + i, label: i });
}

const VehicleSearch = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [makesData, setMakesData] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    setLoading(true);

    let urlStr = Object.keys(selectedData)
      .map((i) => `${i}=${selectedData[i]?.value}`)
      .join("&");

    authAxios
      .get(`lot/search?${urlStr}`)
      .then((res) => {
        setLoading(false);

        const filter_options_data = res.data?.filter_options;
        const _makeData = customOptions(filter_options_data?.makes);
        setMakesData(_makeData);

        const _modelData = customOptions(filter_options_data?.models);
        setModelsData(_modelData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [selectedData]);

  const _handleSelect = (e, type) => {
    setSelectedData({
      ...selectedData,
      [type]: e,
    });

    if (type === "make_ids") {
      if (e) {
        authAxios.get(`lot/search?`);
      }
    }
  };

  const _handleSubmit = () => {
    let result = ``;

    Object.keys(selectedData).map((e) => {
      if (selectedData[e]) {
        result += `${e}=${selectedData[e].value}&`;
      }
    });

    const _removeLast = result?.slice(0, -1);
    router.push(`/all-vehicle?${_removeLast}`);
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-12 gap-0">
        <div className="relative hidden lg:flex justify-center items-center lg:col-span-2 px-4">
          <div
            className="absolute top-0 bottom-0 -right-0.5 h-full w-full bg-primary px-8"
            style={{
              clipPath: `polygon(80% 0, 100% 0%, 100% 100%, 80% 100%, 97% 50%)`,
            }}
          />
          <Image
            src={carAbstract}
            alt="car abstract"
            className="max-w-full h-auto text-center mx-auto"
          />
        </div>
        <div className="bg-primary col-span-12 lg:col-span-10 h-full flex items-center px-4 py-12 lg:p-12">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-end w-full">
            <div className="flex flex-col w-full">
              <label
                htmlFor={"make"}
                className="text-white font-semibold font-secondary mb-2"
              >
                Select Make
              </label>
              <div className="relative">
                <ReactSelect
                  options={makesData}
                  placeholder="Search Makes"
                  isDisabled={loading}
                  className="react-select-container mb-2"
                  classNamePrefix="react-select"
                  onChange={(e) => _handleSelect(e, "make_ids")}
                  isClearable={true}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor={"model"}
                className="text-white font-semibold font-secondary mb-2"
              >
                Select Model
              </label>
              <div className="relative">
                <ReactSelect
                  options={modelsData}
                  placeholder="Search Model"
                  isDisabled={loading}
                  className="react-select-container mb-2"
                  classNamePrefix="react-select"
                  onChange={(e) => _handleSelect(e, "model_ids")}
                  isClearable={true}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor={"year"}
                className="text-white font-semibold font-secondary mb-2"
              >
                Select Year
              </label>
              <div className="relative">
                <ReactSelect
                  options={yearsData}
                  placeholder="Search Year"
                  isDisabled={loading}
                  className="react-select-container mb-2 z-11"
                  classNamePrefix="react-select"
                  onChange={(e) => _handleSelect(e, "year")}
                  isClearable={true}
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={_handleSubmit}
                disabled={loading}
                className="border border-white px-8 py-2 mb-2 rounded-full text-white font-medium hover:bg-white hover:text-primary inline-flex whitespace-nowrap duration-500 float-right sm:float-left"
              >
                Search Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleSearch;
