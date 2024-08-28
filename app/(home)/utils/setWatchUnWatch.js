import { authAxios } from "../axious-config";

export const handleWatch = (vehicleId, watch, token) => {
    authAxios
      .post(
        `/vehicles/${vehicleId}/toggle-watch`,
        { watched: !watch },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };