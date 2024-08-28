import Pusher from "pusher-js";

const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;
const APP_CLUSTER = process.env.NEXT_PUBLIC_APP_CLUSTER;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const MyPusher = (token) => {
  return new Pusher(APP_KEY, {
    authEndpoint: `${BASE_URL}/broadcasting/auth`,
    cluster: APP_CLUSTER,
    encrypted: true,
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  });
};

export default MyPusher;

export const AUCTION_BID_INTRO_TIMING = parseInt(
  process.env.NEXT_PUBLIC_AUCTION_BID_INTRO_TIMING
);
