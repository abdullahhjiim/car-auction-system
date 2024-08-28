"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeImage from "../profile/ChangeImage";
import DocumentFile from "../profile/Document";
import ProfilePass from "../profile/ProfilePass";
import { authAxios } from "/app/(home)/axious-config";
import { setUser } from "/app/(home)/features";

const userData = [
  {
    key: "First Name",
    value: "first_name",
  },
  {
    key: "Last Name",
    value: "last_name",
  },
  {
    key: "Phone",
    value: "primary_phone",
  },
  {
    key: "Status",
    value: "status_name",
  },

  {
    key: "Email",
    value: "email",
  },
  {
    key: "Country",
    value: "country_name",
  },
  {
    key: "Address",
    value: "address",
  },
];

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const authData = useSelector((state) => state.auth);

  const { isAuthenticated, user } = authData;
  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push("/registration?step=4");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get("/auth/me", {
        headers: {
          Authorization: "Bearer " + authData?.token,
        },
      })
      .then((res) => {
        setData(res.data?.data);
        dispatch(
          setUser({
            ...authData,
            user: res.data?.data,
            access_token: authData?.token,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-12">
            <div className="col-span-1 bg-white shadow-light p-4 xl:p-12 rounded-md text-center flex flex-col justify-center items-center">
              <ChangeImage />
              <h4 className="font-bold text-2xl mt-3">{data?.username}</h4>
              <p className="opacity-75">{data?.email}</p>
            </div>

            <div className="col-span-1 lg:col-span-2 bg-white shadow-light p-2 md:p-6 rounded-md">
              <div className="flex justify-between items-center flex-wrap gap-4 mb-6"></div>

              <h3 className="text-2xl font-bold mb-8">Personal Informations</h3>

              {userData.map((item, i) => {
                return (
                  <div
                    className="flex items-start gap-x-2 my-3 overflow-hidden"
                    key={i}
                  >
                    <h4 className="font-semibold sm:text-lg min-w-[100px] md:min-w-[250px]">
                      {item.key}:
                    </h4>
                    <h4 className="font-medium sm:text-lg min-w-1/2 whitespace-wrap">
                      {data?.[item.value]}
                    </h4>
                  </div>
                );
              })}
              {data?.company_name && (
                <div className="flex items-start gap-x-2 my-3">
                  <h4 className="font-semibold text-lg min-w-[150px] md:min-w-[250px]">
                    Company Name:
                  </h4>
                  <h4 className="font-medium text-lg min-w-1/2 whitespace-normal">
                    {data?.company_name}
                  </h4>
                </div>
              )}
            </div>

            <div className="col-span-1 bg-white shadow-light p-4 md:p-6 rounded-md">
              <h3 className="text-2xl font-bold mb-8">Change Password</h3>

              <ProfilePass token={authData?.token} />
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <DocumentFile data={data} />
      </div>
    </>
  );
};
export default ProfileComponent;
