import { useTimer } from "react-timer-hook";

const BreakTime = ({ timeStr, title }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date(timeStr),
  });

  let resumeText = "";
  if (hours > 0) {
    resumeText += `<span className="text-[#BBC0C1]"> ${hours} </span> hours `;
  }

  if (minutes > 0 || hours > 0) {
    resumeText += `<span className="text-[#BBC0C1]"> ${minutes} </span> minutes `;
  }

  if (seconds > 0 || minutes > 0 || hours > 0) {
    resumeText += `<span className="text-[#BBC0C1]"> ${seconds} </span> seconds`;
  }

  if (!resumeText) {
    resumeText = " A few moment";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="text-white text-center">
        <h4 className="text-white uppercase text-7xl">{title}</h4>
        <h4 className="text-2xl text-green-500">
          Resume In:
          <span dangerouslySetInnerHTML={{ __html: resumeText }}></span>
        </h4>
      </div>
    </div>
  );
};

export default BreakTime;
