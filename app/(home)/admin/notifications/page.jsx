"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { authAxios } from "/app/(home)/axious-config";

const Notifications = () => {
  const { token } = useSelector((state) => state.auth);
  const { myNotifications } = useSelector((state) => state.notification);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [allFilter, setAllFilter] = useState("active");
  const [unreadFilter, setUnreadFilter] = useState("");

  const limit = 20;
  const getNotifications = (offsetData = 1, filter = true) => {
    if (offsetData == 1) {
      setLoading(true);
    }

    let url = `/notifications?limit=${limit}&page=${offsetData}`;
    if (!filter) {
      url = url + `&unread_only=true`;
    }

    authAxios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let cloneData = offsetData > 1 ? [...data] : [];
        setData([...cloneData, ...res?.data?.data]);
        setLoading(false);

        if (res?.data?.meta?.current_page == res?.data?.meta?.last_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNotifications(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = () => {
    if (hasMore) {
      let newOffset = offset + 1;
      setOffset(newOffset);
      getNotifications(newOffset, unreadFilter != "active");
    }
  };

  const _handleNotification = (url, item) => {
    const postUrl = `notifications/${item?.id}/mark-as-read`;

    if (!item.is_read) {
      authAxios.post(postUrl, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }

    router.push(url);
  };

  const filterHandle = (type) => {
    let isRead = true;
    if (type == "all") {
      setAllFilter("active");
      setUnreadFilter("");
    } else if ((type = "unread")) {
      setAllFilter("");
      setUnreadFilter("active");
      isRead = false;
    }

    setOffset(1);
    getNotifications(1, isRead);
  };

  const _handleMarkAsRead = () => {
    setNotificationLoading(true);
    const postUrl = "notifications/mark-all-as-read";

    authAxios
      .post(postUrl, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        filterHandle("all");
      })
      .finally(() => {
        setNotificationLoading(false);
      });
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="bg-gray-50 h-[40px]"></div>
        <div className="h-auto flex justify-center">
          <div className="w-[600px] bg-white rounded-md pb-8 mb-16">
            <div className="flex justify-between p-4">
              <h4 className="text-xl font-bold">Notifications</h4>
              {myNotifications?.unread_notifications > 0 && (
                <button
                  onClick={_handleMarkAsRead}
                  disabled={notificationLoading}
                  className="bg-primary font-semibold text-xs rounded-md text-white px-2 py-1 hover:bg-opacity-80 duration-200"
                >
                  {notificationLoading ? "loading..." : "Mark all as read"}
                </button>
              )}
            </div>
            <hr />
            <div className="flex gap-2 ml-6 py-4">
              <button
                onClick={() => filterHandle("all")}
                disabled={allFilter == "active"}
                className={
                  allFilter == "active"
                    ? ` bg-blue-500 text-white font-semibold text-sm px-2 py-1 rounded-xl`
                    : `cursor-pointer font-semibold text-sm px-2 py-1 rounded-xl hover:bg-blue-200 duration-500`
                }
              >
                All
              </button>
              <button
                onClick={() => filterHandle("unread")}
                disabled={unreadFilter == "active"}
                className={
                  unreadFilter == "active"
                    ? ` bg-blue-500 text-white font-semibold text-sm px-2 py-1 rounded-xl`
                    : `cursor-pointer font-semibold text-sm px-2 py-1 rounded-xl hover:bg-blue-200 duration-500`
                }
              >
                Unread
              </button>
            </div>
            <ul className="px-4">
              {loading ? (
                <>
                  <li
                    className={`flex px-2 gap-2 cursor-pointer items-center text-sm py-2 bg-gray-50 rounded-md hover:bg-gray-400 duration-500`}
                  >
                    <p></p>
                  </li>
                  <li
                    className={`flex px-2 gap-2 cursor-pointer items-center text-sm py-2 bg-gray-50 rounded-md hover:bg-gray-400 duration-500`}
                  >
                    <p></p>
                  </li>
                  <li
                    className={`flex px-2 gap-2 cursor-pointer items-center text-sm py-2 bg-gray-50 rounded-md hover:bg-gray-400 duration-500`}
                  >
                    <p></p>
                  </li>
                  <li
                    className={`flex px-2 gap-2 cursor-pointer items-center text-sm py-2 bg-gray-50 rounded-md hover:bg-gray-400 duration-500`}
                  >
                    <p></p>
                  </li>
                </>
              ) : (
                <InfiniteScroll
                  dataLength={data?.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <p className="text-center font-semibold text-sm">
                      Loading...
                    </p>
                  }
                  className="flex flex-col gap-3"
                  endMessage={""}
                >
                  {data.length > 0 &&
                    data.map((item, index) => {
                      let color = "bg-gray-300";
                      let url = ``;

                      if (item?.notifiable_type == "Vehicle") {
                        url = `/admin/sell-my-car/all-car/${item?.notifiable_id}`;
                      } else if (item?.notifiable_type == "CarLost") {
                        url = `/admin/bids/vehicles-lost`;
                      } else if (item?.notifiable_type == "CarWon") {
                        url = `/admin/bids/vehicles-won`;
                      } else if (item?.notifiable_type == "WishlistVehicle") {
                        url = `/all-vehicle/${item?.notifiable_id}`;
                      } else if (item?.notifiable_type == "SellingOnApproval") {
                        url = `/admin/sell-my-car/approval-car/${item?.notifiable_id}`;
                      }

                      if (item?.is_read) {
                        color = "bg-gray-50";
                      }

                      return (
                        <li
                          className={`flex px-2 gap-2 justify-start cursor-pointer items-center text-sm py-2 ${color} rounded-md hover:bg-gray-400 duration-500`}
                          key={index}
                          onClick={() => _handleNotification(url, item)}
                        >
                          <div className="h-12 w-12">
                            <AiFillCar
                              size={30}
                              className="h-10 w-10 rounded-full p-1 ring-2 ring-blue-100 bg-gray-300 border-2 border-white"
                            />
                          </div>
                          <p className="w-full">{item?.message}</p>
                        </li>
                      );
                    })}
                  {data?.length == 0 && (
                    <li
                      className={`flex px-2 gap-2 cursor-pointer items-center text-sm py-2 bg-gray-50 rounded-md hover:bg-gray-400 duration-500`}
                    >
                      <p className="text-center">Notification not found</p>
                    </li>
                  )}
                </InfiniteScroll>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
