import { useTimer } from "react-timer-hook";

const MyTimer = ({ auction }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(auction?.auction_at),
  });

  const createdAtMili = new Date(auction?.auction_created_at).getTime();
  const currentAtMili = new Date().getTime();
  const auctionAtMili = new Date(auction?.auction_at).getTime();

  const totalDifference = auctionAtMili - createdAtMili;
  const progressDifference = currentAtMili - createdAtMili;

  let percentage = Math.abs(
    parseInt((progressDifference * 100) / totalDifference)
  );

  percentage = percentage >= 100 ? 100 : percentage;

  return (
    <div className="flex flex-col justify-center items-center p-2 gap-2">
      <p className="text-sm font-semibold">
        {days}d {hours}h {minutes}m {seconds}s
      </p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MyTimer;
