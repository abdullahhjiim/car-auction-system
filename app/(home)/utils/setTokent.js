import { authAxios } from "../axious-config";

const SetAuthToken = (token) => {
  if (token) {
    authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete authAxios.defaults.headers.common["Authorization"];
  }
};

export default SetAuthToken;

export function makeAuthData(data) {
  const makeData = {
    access_token: data.access_token,
    user: data.user,
  };

  localStorage.setItem("authData", JSON.stringify(makeData));

  SetAuthToken(data.access_token);
}
