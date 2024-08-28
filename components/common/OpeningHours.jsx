const dummyData = [
  {
    title: "Sunday",
    time: "Close",
  },
  {
    title: "Monday",
    time: "9.00 am - 9.00 pm",
  },
  {
    title: "Tuesday",
    time: "9.00 am - 9.00 pm",
  },
  {
    title: "Wednesday",
    time: "9.00 am - 9.00 pm",
  },
  {
    title: "Thursday",
    time: "9.00 am - 9.00 pm",
  },
  {
    title: "Friday",
    time: "9.00 am - 9.00 pm",
  },
  {
    title: "Satarday",
    time: "9.00 am - 9.00 pm",
  },
];

const OpeningHours = () => {
  return (
    <div className="bg-secondary p-4 md:p-12 rounded-xl text-center">
      <h4 className="text-xl font-medium text-primary">Opening Hours</h4>
      <div className="flex flex-col gap-y-4 mt-4">
        {dummyData.map((item, i) => (
          <div
            className="flex justify-between items-center gap-x-2 opacity-70"
            key={i}
          >
            <h3>{item.title}</h3>
            <h3>{item.time}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;
