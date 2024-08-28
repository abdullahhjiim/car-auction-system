"use client";

import { authAxios } from "@/app/(home)/axious-config";
import { logout } from "@/app/(home)/features";
import { clearNotification } from "@/app/(home)/features/notification/notificationSlice";
import logo from "@/public/logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";

const navItems = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Auctions",
    link: "",
    child: [
      {
        text: "Auction List",
        link: "/auctions",
      },
      {
        text: "Auction Calendar",
        link: "/auction-calendar",
      },
    ],
  },
  {
    text: "Vehicles",
    link: "",
    child: [
      {
        text: "All Vehicle",
        link: "/all-vehicle",
      },
      {
        text: "Auction Vehicle",
        link: "/auction-vehicle",
      },
      {
        text: "Buy Now Vehicle",
        link: "/buy-now-vehicle",
      },
    ],
  },
  {
    text: "About Us",
    link: "/about-us",
  },
  {
    text: "Contact Us",
    link: "/contact-us",
  },
  {
    text: "Downloads",
    link: "/downloads",
  },
  {
    text: "Careers",
    link: "/careers",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [userDash, setUserDash] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [logoutModal, setLogoutModal] = useState(false);
  const pathName = usePathname();

  const _hanldeLogout = (e) => {
    e.preventDefault();
    setLogoutModal(true);
    setUserDash(false);
  };

  useEffect(() => {
    if (logoutModal) {
      setUserDash(false);
    }
  }, [logoutModal]);

  useEffect(() => {
    // Auto Logout form axios
    authAxios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error?.response?.status === 401) {
          dispatch(logout());
          dispatch(clearNotification());
          localStorage.removeItem("authData");
          router.push("/login?back=true");
        }
        return Promise.reject(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push("/registration?step=4");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  if (pathName.startsWith("/live-auction") || pathName.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="bg-primary shadow-md py-2 sticky top-0 z-[1000]">
      {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      )}
      {userDash && (
        <div
          className="absolute inset-0 h-screen w-screen bg-black bg-opacity-0 z-[100] overflow-hidden"
          onClick={() => setUserDash(false)}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex justify-between items-center p-1">
          <div className="flex items-center gap-x-8">
            <div>
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="logo"
                  className="max-w-[150px] h-auto object-cover"
                />
              </Link>
            </div>

            {/* nav */}
            <ul className="flex items-center gap-x-4 text-white">
              {navItems.map((item, i) => {
                if (item?.child && item?.child.length > 0) {
                  const isActiveNav = item?.child.some(
                    (inItem) => inItem?.link === pathName
                  );
                  return (
                    <li
                      className="group text-base font-medium cursor-pointer relative flex items-center justify-center gap-[2px]"
                      key={i}
                    >
                      <span
                        className={`absolute -bottom-1 w-0 h-0.5 block bg-white group-hover:w-[111%] duration-500 text-left ${
                          isActiveNav && "w-[111%]"
                        }`}
                      />
                      {item.text} <FaChevronDown className="-mb-1" />
                      <div className="hidden group-hover:block hover:block absolute top-full left-0 z-10">
                        <ul className="bg-white shadow-light min-w-[200px] rounded-md overflow-hidden border-y-4 border-red-600 p-2">
                          {item.child.map((e, index) => (
                            <li key={index} className="my-[2px]">
                              <Link
                                href={e.link}
                                className={`p-2 w-full inline-block font-semibold text-black  hover:text-white text-whtie hover:bg-primary hover:text-white hover:opacity-90 duration-300 rounded-md  ${
                                  pathName === e.link && "bg-primary text-white"
                                }`}
                              >
                                {e.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="font-medium duration-500 relative group flex items-center justify-center"
                      key={i}
                    >
                      <span
                        className={`absolute -bottom-1 w-0 h-[3px] block bg-white group-hover:w-[111%] duration-500 ${
                          pathName === item?.link && "w-[111%]"
                        }`}
                      />

                      <Link href={item.link}>{item.text}</Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div className="flex items-center gap-x-8">
            {!isAuthenticated && (
              <ul className="flex items-center gap-x-2 text-white">
                <li
                  key={"login"}
                  className="text-base font-medium p-1 px-3 hover:bg-white hover:text-primary rounded-md duration-300"
                  onClick={() => setActive(false)}
                >
                  <Link href="/login">Login</Link>
                </li>
                <li
                  key={"registration"}
                  className="text-base font-medium bg-white rounded-md text-primary p-1 px-2 cursor-pointer hover:bg-opacity-80 hover:text-opacity-80 duration-500"
                  onClick={() => setActive(false)}
                >
                  <Link href="/registration">Register</Link>
                </li>
              </ul>
            )}

            {/* phone number and contact info */}
            {!isAuthenticated && (
              <div className="flex items-center gap-x-2 text-white">
                <FaPhoneAlt size={30} className="rotate-12" />
                <div>
                  <p className="text-sm">CALL US</p>
                  <p className="text-sm font-medium">
                    <a href={`tel: ${process.env.NEXT_PUBLIC_NUMBER_2}`}>
                      {process.env.NEXT_PUBLIC_NUMBER_2}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {isAuthenticated && (
              <div
                className="relative cursor-pointer flex items-center gap-x-1"
                onClick={() => setUserDash((prev) => !prev)}
              >
                <h4 className="font-semibold text-ellipsis line-clamp-1 max-w-[80px] text-white">
                  {user?.name}
                </h4>
                <Image
                  src={user?.profile_photo}
                  alt="user"
                  width={52}
                  height={52}
                  className="rounded-full"
                />

                {userDash && (
                  <>
                    <div className="absolute top-full right-0 bg-white shadow-light min-w-48 flex flex-col justify-center items-center z-[10000] rounded-md overflow-hidden border-y-4 border-red-600 p-2">
                      <Link
                        href={`/admin/dashboard`}
                        onClick={() => setUserDash(false)}
                        className={`hover:bg-primary hover:text-white cursor-pointer font-semibold text-lg w-full p-2 rounded-md ${
                          pathName === "/admin/dashboard" &&
                          "bg-primary text-white"
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={`/admin/profile`}
                        onClick={() => setUserDash(false)}
                        className={`hover:bg-primary hover:text-white cursor-pointer font-semibold text-lg w-full p-2 rounded-md ${
                          pathName === "/admin/profile" &&
                          "bg-primary text-white"
                        }`}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={_hanldeLogout}
                        className="hover:bg-primary text-left hover:text-white cursor-pointer font-semibold w-full p-2 rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* mobile navigation */}
        <div className="lg:hidden flex justify-between items-center gap-x-4">
          <div
            className="cursor-pointer text-white"
            onClick={() => setActive((prev) => !prev)}
          >
            <GiHamburgerMenu size={30} />
          </div>

          <div>
            <Image src={logo} alt="logo" className="max-w-[100px] h-auto" />
          </div>

          <div className="flex gap-x-4 items-center">
            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-x-2 text-primary">
                <FaPhoneAlt size={30} className="rotate-12" />
                <div>
                  <p className="text-sm">CALL US</p>
                  <p className="sm:text-xl font-medium">
                    {/* {process.env.NEXT_PUBLIC_NUMBER} */}
                    <a href={`tel: ${process.env.NEXT_PUBLIC_NUMBER_1}`}>
                      {process.env.NEXT_PUBLIC_NUMBER_1}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {!isAuthenticated && !userDash && (
              <ul className="flex items-center gap-x-3">
                <li className="text-base font-bold text-white hover:text-opacity-95">
                  <Link href={`/login`}>Login</Link>
                </li>
                <li className="text-base font-bold bg-white text-primary py-1 px-3 hover:opacity-95 rounded-md">
                  <Link href={`/registration`}>Register</Link>
                </li>
              </ul>
            )}

            {isAuthenticated && (
              <div
                className="relative cursor-pointer"
                onClick={() => setUserDash((prev) => !prev)}
                onBlur={() => setUserDash(false)}
              >
                <Image
                  src={user?.profile_photo}
                  alt="user"
                  height={50}
                  width={50}
                  className="rounded-full"
                />

                {userDash && (
                  <>
                    <div className="absolute top-full right-0 bg-white shadow-light min-w-80 flex flex-col justify-center items-center z-[10000] rounded-md overflow-hidden border-y-4 border-red-600 p-2">
                      <Link
                        href={`/admin/dashboard`}
                        onClick={() => setUserDash(false)}
                        className="hover:bg-primary hover:text-white cursor-pointer font-bold text-lg w-full py-3 px-3 rounded-md"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={`/admin/profile`}
                        onClick={() => setUserDash(false)}
                        className={`hover:bg-primary hover:text-white cursor-pointer font-bold text-lg w-full py-3 px-3 rounded-md ${
                          pathName === "/admin/profile" &&
                          "bg-primary text-white"
                        }`}
                      >
                        Profile
                      </Link>
                      <h6
                        onClick={_hanldeLogout}
                        className="hover:bg-primary hover:text-white cursor-pointer font-bold text-lg w-full py-3 px-3 rounded-md"
                      >
                        Logout
                      </h6>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {active && (
        <div className="absolute w-[70%] sm:w-1/2 h-screen pb-4 bg-white z-[10000]">
          <div
            className="absolute top-5 right-5 cursor-pointer hover:text-primary"
            onClick={() => setActive(false)}
          >
            <FaTimes size={30} />
          </div>
          <ul className="flex flex-col items-center gap-y-6 mt-12">
            {navItems.map((item, i) => {
              if (item?.child && item?.child.length > 0) {
                return (
                  <li
                    className="text-xl group font-medium hover:text-primary cursor-pointer relative flex items-center justify-center gap-2"
                    key={i}
                  >
                    {item.text} <FaChevronDown className="-mb-1" />
                    <div className="hidden group-hover:block hover:block absolute bg-white top-full -left-1/2 z-10 ">
                      <ul className="min-w-[250px] rounded-md border-y-4 border-red-600 p-2 shadow">
                        {item.child.map((e, index) => (
                          <li
                            className="p-3 font-semibold text-black hover:bg-primary hover:text-white hover:opacity-90 cursor-pointer duration-300 rounded-md"
                            key={index}
                          >
                            <Link href={e.link}>{e.text}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li
                    className="text-xl font-medium hover:text-primary"
                    key={i}
                    onClick={() => setActive(false)}
                  >
                    <Link href={item.link}>{item.text}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
