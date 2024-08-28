"use client";

import DashboardSidebar from "@/components/common/DashboardSidebar";
import { useState } from "react";

const dummyData = [
  {
    title: "English",
    value: "english",
  },
  {
    title: "Bangla",
    value: "bangla",
  },
  {
    title: "Arabic",
    value: "arabic",
  },
];

const AccountSetting = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  return (
    <>
      <div className="py-12 md:py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-11">
            <div className="w-full lg:w-1/3 xl:w-1/4">
              <DashboardSidebar />
            </div>
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <h4 className="text-3xl font-bold mb-4">Account Settings</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                {/* language */}
                <div className="shadow-light rounded-lg overflow-hidden w-full p-4 lg:p-6 min-h-[170px] flex flex-col justify-center gap-y-3">
                  <h4 className="text-primary text-2xl font-semibold mb-3">
                    Website Language
                  </h4>

                  <div className="flex justify-between items-center gap-4">
                    <select
                      required
                      name="language"
                      id="language"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="bg-white !p-3  rounded-lg focus:border-0 focus:outline-none w-full max-h-[100px] overflow-y-auto input-with-shadow "
                    >
                      {dummyData.map((option, i) => (
                        <>
                          <option
                            className="capitalize"
                            value={option.value}
                            key={i}
                          >
                            {option.title}
                          </option>
                        </>
                      ))}
                    </select>

                    <button className="bg-primary text-white rounded-full py-2 px-6 flex justify-center items-center">
                      Save
                    </button>
                  </div>
                </div>

                {/* change password */}
                <div className="shadow-light rounded-lg overflow-hidden w-full p-4 lg:p-6 min-h-[170px] flex flex-col justify-center gap-y-3">
                  <h4 className="text-primary text-2xl font-semibold mb-3">
                    Change Password
                  </h4>

                  <div className="flex justify-between items-center gap-4">
                    <button className="bg-primary text-white rounded-full py-2 px-6 flex justify-center items-center">
                      Save
                    </button>
                  </div>
                </div>

                {/* Membership */}
                <div className="shadow-light rounded-lg overflow-hidden w-full p-4 lg:p-6 min-h-[170px] flex flex-col justify-center gap-y-3">
                  <h4 className="text-primary text-2xl font-semibold mb-3">
                    Your User Membership ID is : MAH49063
                  </h4>

                  <p>
                    Your membership expires on{" "}
                    <span className="font-bold">Jan 3, 2025</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;
