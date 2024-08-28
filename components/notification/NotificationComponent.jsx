import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authAxios } from "/app/(home)/axious-config";
import MyPusher from "/app/(home)/config";
import {
  updateAddNotification,
  updateDeleteNotification,
  updateReadNotification,
} from "/app/(home)/features/notification/notificationSlice";

const NotificationComponent = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { myNotifications } = useSelector((state) => state.notification);
  const [channel, setChannel] = useState(null);
  const [pusherInstance, setPusherInstance] = useState(null);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const pusher = MyPusher(token);
      // TODO:: pusher 403 status handle

      const pusher_channel = pusher.subscribe(
        `private-customer.notifications.${user?.id}`
      );
      setChannel(pusher_channel);
      setPusherInstance(pusher);
    }

    return () => {
      if (pusherInstance) {
        channel.unsubscribe();
        pusherInstance.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotifyClick = (notifyObject) => {
    let item = notifyObject?.notification;
    if (item) {
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

      _handleNotification(url, item);
    }
  };

  useEffect(() => {
    if (channel && channel.bind) {
      channel.bind("NEW_NOTIFICATION", function (data) {
        toast.info(
          data?.notification?.message ? (
            <p className="" onClick={() => handleNotifyClick(data)}>
              {data?.notification?.message}
            </p>
          ) : (
            "New notification arrived"
          ),
          {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
        dispatch(updateAddNotification({ ...data }));
      });
      channel.bind("READ_NOTIFICATION", function (data) {
        dispatch(updateReadNotification({ ...data }));
      });
      channel.bind("DELETE_NOTIFICATION", function (data) {
        dispatch(updateDeleteNotification({ ...data }));
      });
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  const _handleNotification = (url, item) => {
    const postUrl = `notifications/${item.id}/mark-as-read`;

    if (!item.is_read) {
      authAxios.post(postUrl, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }

    router.push(url);
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
      .finally(() => {
        setNotificationLoading(false);
      });
  };

  let unread_notifications = 0;
  let finalNotificationList = [];
  let data = {};

  if (myNotifications) {
    unread_notifications = myNotifications?.unread_notifications;
    data = myNotifications?.data;
    finalNotificationList = Object.values(data).sort((a, b) => b?.id - a?.id);
  }

  return (
    <>
      <h4 className="font-semibold text-ellipsis line-clamp-1 max-w-[100px] group text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
        <div className="absolute top-1 -left-1 bg-primary rounded-full px-1 text-xs text-white">
          {unread_notifications}
        </div>
        <div className="hidden absolute group-hover:block w-[300px] right-0 top-6">
          <div className="bg-white shadow-light rounded-md mt-4 flex justify-between items-center p-2">
            <div className="text-black hover:bg-primary hover:text-white duration-300 rounded-md p-3">
              <h4>
                Notification{" "}
                {finalNotificationList.length > 0 && (
                  <span>
                    <Link
                      href="/admin/notifications"
                      className="text-blue-400 text-xs hover:underline"
                    >
                      see all
                    </Link>
                  </span>
                )}
              </h4>
            </div>

            {unread_notifications > 0 && (
              <button
                onClick={_handleMarkAsRead}
                disabled={notificationLoading}
                className="max-w-[150px] bg-primary font-semibold text-xs rounded-md text-white py-1 px-2 hover:bg-opacity-80 duration-500"
              >
                {notificationLoading ? "loading..." : "Mark all as read"}
              </button>
            )}
          </div>
          <ul className="bg-gray-200 rounded-b-md flex flex-col text-primary max-h-[400px] overflow-y-auto">
            {finalNotificationList.map((item, i) => {
              let color = "bg-gray-400";
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
                color = "";
              }

              return (
                <li
                  key={i}
                  onClick={() => _handleNotification(url, item)}
                  className={`text-xs flex justify-start items-center gap-2 ${color} border-t-[1px] border-gray-300 p-4  font-semibold corsor-pointer hover:text-gray-800 duration-200`}
                >
                  <div className="">
                    <AiFillCar size={20} />
                  </div>
                  <p>{item?.message}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </h4>
    </>
  );
};

export default NotificationComponent;
