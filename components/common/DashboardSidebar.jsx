"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCarSide, FaChevronDown, FaHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard, MdPayment } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LogoutModal from "./LogoutModal";
import { logout } from "/app/(home)/features";
import { clearNotification } from "/app/(home)/features/notification/notificationSlice";

const dashboardData = [
  {
    link: "/admin/dashboard",
    text: "Dashboard",
    path: "dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/admin/my-wishlist",
    text: "My Wishlist",
    path: "my-wishlist",
    icon: <FaHeart />,
  },
  {
    text: "Bids Status",
    path: "bids",
    icon: <TbStatusChange />,
    child: [
      {
        link: "/admin/bids/winning-prebids",
        text: "My Bids",
        path: "winning-prebids",
      },
      {
        link: "/admin/bids/vehicles-won",
        text: "Vehicles Won",
        path: "vehicles-won",
      },
      {
        link: "/admin/bids/vehicles-lost",
        text: "Vehicles Lost",
        path: "vehicles-lost",
      },
      {
        link: "/admin/bids/vehicles-on-approval",
        text: "Vehicles On Approval",
        path: "vehicles-on-approval",
      },
    ],
  },
  {
    link: "/admin/booked-vehicles",
    text: "Booked Vehicles",
    path: "booked-vehicles",
    icon: <AiFillEdit />,
  },

  {
    text: "Sell My Car",
    icon: <FaCarSide />,
    child: [
      {
        link: "/admin/sell-my-car/all-car",
        text: "All Car",
        path: "all-car",
      },
      {
        link: "/admin/sell-my-car/inventory-car",
        text: "Inventory",
        path: "inventory-car",
      },
      {
        link: "/admin/sell-my-car/on-approval",
        text: "On Approval Cars",
        path: "on-approval",
      },
      {
        link: "/admin/sell-my-car/auction-car",
        text: "Auction Cars",
        path: "auction-car",
      },
      {
        link: "/admin/sell-my-car/approval-car",
        text: "Selling Approval Cars",
        path: "approval-car",
      },
      {
        link: "/admin/sell-my-car/sold-car",
        text: "Sold Car",
        path: "sold-car",
      },
      {
        link: "/admin/sell-my-car/rejected-car",
        text: "Rejected Car",
        path: "rejected-car",
      },
    ],
  },
  {
    text: "Payment",
    icon: <MdPayment />,
    child: [
      {
        link: "/admin/payment/payment-due",
        text: "Payment Due",
        path: "payment-due",
      },
      {
        link: "/admin/payment/payment-history",
        text: "Payment History",
        path: "payment-history",
      },

      {
        link: "/admin/payment/deposit-account",
        text: "Deposit Account",
        path: "deposit-account",
      },
      {
        link: "/admin/payment/online-account",
        text: "Online Account",
        path: "online-account",
      },
      {
        link: "/admin/payment/booked-vehicle-due",
        text: "Booked Vehicle Due",
        path: "booked-vehicle-due",
      },
      {
        link: "/admin/payment/booked-payment-history",
        text: "Booked Payment History",
        path: "booked-payment-history",
      },
    ],
  },
];

const DashboardSidebar = () => {
  const [activeDashboard, setActiveDashboard] = useState();
  const [childActive, setChildActive] = useState();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const path = pathParts[pathParts.length - 1];
  const [openParent, setOpenParent] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    setActiveDashboard(path);
    setChildActive(pathParts[3] ?? null);

    if (pathParts[2] && pathParts[2] == "bids") {
      setOpenParent(2);
    } else if (pathParts[2] && pathParts[2] == "payment") {
      setOpenParent(5);
    } else if (pathParts[2] && pathParts[2] == "sell-my-car") {
      setOpenParent(4);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleParentClick = (index) => {
    setOpenParent(openParent === index ? null : index);
  };

  const isParentOpen = (index) => {
    return openParent === index;
  };

  const showSwal = () => {
    withReactContent(Swal)
      .fire({
        title: "Do you want to Logout?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#B20A0B",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(logout());
          dispatch(clearNotification());
          router.push("/login");
        }
      });
  };

  const _hanldeLogout = (e) => {
    e.preventDefault();
    setLogoutModal(true);
  };

  const withChildActiveDashboard = childActive ?? activeDashboard;

  return (
    <>
      {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      )}
      {activeDashboard && (
        <div className="shadow-light bg-white rounded-lg overflow-hidden w-full">
          <ul className="flex flex-col">
            {dashboardData.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {!item.child ? (
                    <Link
                      href={item?.link}
                      className={`py-4 px-4 text-lg cursor-pointer duration-500 hover:bg-primary hover:bg-opacity-95 hover:text-white border-b-2 flex items-center gap-x-2 m-1 rounded-md ${
                        activeDashboard === item?.path &&
                        "bg-primary text-white"
                      }`}
                    >
                      {item?.icon} {item?.text}
                    </Link>
                  ) : (
                    <div
                      className={`relative text-lg cursor-pointer  duration-500 border-b-2 flex flex-col m-1 rounded-md`}
                      key={i}
                    >
                      <div
                        className="flex justify-between py-4 px-4 items-center hover:bg-primary hover:bg-opacity-95 hover:text-white w-full h-full rounded-md"
                        onClick={() => handleParentClick(i)}
                      >
                        <p className="flex items-center gap-x-2">
                          {item?.icon} {item?.text}
                        </p>
                        <FaChevronDown size={15} />
                      </div>
                      {isParentOpen(i) && (
                        <div className="">
                          <ul className="flex flex-col">
                            {item?.child.map((childItem, j) => (
                              <Link
                                href={childItem?.link}
                                key={j}
                                className={`py-4 px-4 text-sm cursor-pointer duration-500 hover:bg-primary hover:bg-opacity-95 hover:text-white border-b-2 rounded-md ${
                                  withChildActiveDashboard ===
                                    childItem?.path && "bg-primary text-white"
                                } ${
                                  j === item?.child.length - 1 && "border-b-0"
                                }`}
                              >
                                {childItem?.text}
                              </Link>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <li
              onClick={_hanldeLogout}
              className={`flex items-center gap-x-2 py-4 px-4 text-lg cursor-pointer duration-500 hover:bg-primary hover:text-white`}
            >
              <IoLogOut /> Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
