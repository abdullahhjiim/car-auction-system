const objectKeyData = [
  {
    title: "Vin",
    value: "vin",
  },
  {
    title: "Drive Train",
    value: "drive",
  },
  {
    title: "Odometer",
    value: "odometer",
  },
  {
    title: "Body Style",
    value: "body_style",
  },
  {
    title: "Fuel Type",
    value: "fuel_type",
  },
  {
    title: "Color",
    value: "color",
  },
  {
    title: "Primary Damage",
    value: "primary_damage",
  },
  {
    title: "Engine Type",
    value: "engine_type",
  },
  {
    title: "Secondary Damage",
    value: "secondary_damage",
  },
  {
    title: "Cylinder",
    value: "cylinder",
  },
];

const SingleCarBidDetails = ({ vehicle }) => {
  return (
    <div className="mt-3">
      <hr className="my-4" />
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-y-2 px-2 text-sm">
          {objectKeyData?.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <p className="uppercase">{item.title}</p>
              <p className="font-semibold">{vehicle?.[item.value]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCarBidDetails;
