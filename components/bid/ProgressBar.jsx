"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import renderTime from "./bidFunction";

const ProgressBar = ({
  bid_detail,
  interval,
  event,
  bidColor,
  isPlaying,
  key,
  isOnline,
  miliSecond,
  msg,
}) => {
  return (
    <div className="relative flex justify-center items-center mt-3">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        key={key}
        duration={interval ?? 30}
        colors={bidColor ?? "#B20A0B"}
        rotation="counterclockwise"
      >
        {(remainTime) =>
          renderTime(remainTime, event, bid_detail, isOnline, miliSecond, msg)
        }
      </CountdownCircleTimer>
    </div>
  );
};

export default ProgressBar;
