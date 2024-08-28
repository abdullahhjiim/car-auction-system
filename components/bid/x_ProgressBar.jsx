"use client";
import { useEffect, useState } from "react";
import { getTimer } from "./bidFunction";

const ProgressBar = ({
  bid_detail,
  interval,
  event,
  bidColor,
  testingProps,
}) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(null);
    setTimeout(() => {
      let con = null;
      if (event == "READY_TO_BID") {
        con = getTimer(true, event, bid_detail, interval, bidColor);
      } else if (event == "NEW_BID") {
        con = getTimer(true, event, bid_detail, interval, bidColor);
      } else if (event == "BONUS_TIME") {
        con = getTimer(true, event, bid_detail, interval, bidColor);
      } else if (event == "BID_ENDED") {
        con = getTimer(false, event, bid_detail, interval, bidColor);
      } else if (testingProps > 0) {
        con = getTimer(true, "BONUS_TIME", bid_detail, 10, bidColor);
      } else {
        con = getTimer(false, event, bid_detail, 10, bidColor);
      }
      setContent(con);
    }, 300);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, bidColor, testingProps]);

  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   return (
  //     <span className="text-primary">
  //       {hours}: {minutes}:{seconds}
  //     </span>
  //   );
  // };

  // const renderTime = (date) => {
  //   return (
  //     <div>
  //       {" "}
  //       <p>Bid Start</p>
  //       {date > 0 && <Countdown date={date} renderer={renderer} />}
  //     </div>
  //   );
  // };

  // let finalContent = "";
  // if (!content && auction_detail?.auction_type == "offline") {
  //   finalContent = defalutContent;
  // } else if (!content && auction_detail?.auction_type == "online") {
  //   finalContent = (
  //     <CountdownCircleTimer
  //       isPlaying={false}
  //       duration={100}
  //       colors={[bidColor]}
  //       colorsTime={[10, 6]}
  //     >
  //       {(remainingTime) =>
  //         renderTime(auction_detail?.auction_at_in_milliseconds)
  //       }
  //     </CountdownCircleTimer>
  //   );
  // } else {
  //   finalContent = content;
  // }

  // console.log(content);
  return (
    <div className="relative flex justify-center items-center mt-3">
      {content && content}
    </div>
  );
};

export default ProgressBar;
