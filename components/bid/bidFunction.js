/* eslint-disable @next/next/no-img-element */
import Countdown from "react-countdown";

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <span className="text-primary">
      {hours}: {minutes}:{seconds}
    </span>
  );
};

const renderTime = (dfObj, event, bid_detail, isOnline, miliSecond, msg) => {
  
    if (dfObj?.remainingTime === 0 && bid_detail?.amount && !isOnline) {
       return  (
            <div className=" flex flex-col justify-center items-center gap-y-2">
              <img src={bid_detail?.flag} alt="flag" height={60} width={60} className="w-12 h-auto" />
              <h6 className="text-[12px] font-semibold">{bid_detail?.country}</h6>
              <h6 className="text-xl font-bold">{bid_detail?.amount}</h6>
            </div>
          )
    }

    if(event == 'NEW_BID') {
        return (
            <div className=" flex flex-col justify-center items-center gap-y-2">
              <img src={bid_detail?.flag} alt="flag" height={60} width={60} className="w-12 h-auto" />
              <h6 className="text-[12px] font-semibold">{bid_detail?.country}</h6>
              <h6 className="text-xl font-bold">{bid_detail?.amount}</h6>
            </div>
          );
    }else if(event == 'READY_TO_BID') {
        return <div className="font-bold">Ready To Bid!</div>;
    }else if(event == 'BID_ENDED') {
        return <div className="font-bold">{msg ?? 'Bid Ended!'}</div>;
    }else if(event == 'BONUS_TIME') {
      return <div className="font-bold">Bonus Time!</div>;
    }else {
      if(isOnline) {
        return (
          <div>
            <p>Bid Start</p>
            {miliSecond > 0 && <Countdown date={miliSecond} renderer={renderer} />}
          </div>
        );
      }else {
        return <div className="font-bold">Wait For Bid!</div>;
      }
    }
  };


export default renderTime;
