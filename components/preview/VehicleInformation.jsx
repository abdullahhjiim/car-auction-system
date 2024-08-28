const VehicleInformation = ({ vehicle }) => {
  return (
    <div className="grid grid-cols-1 gap-2 text-xl md:text-3xl text-white uppercase">
      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Odometer:</p>
        <p>{vehicle?.odometer}</p>
      </div>

      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Highlight:</p>
        <p>{vehicle?.highlight}</p>
      </div>

      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Transmission:</p>
        <p>{vehicle?.transmission}</p>
      </div>

      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Drive Train:</p>
        <p>{vehicle?.drive}</p>
      </div>

      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Fuel Type:</p>
        <p>{vehicle?.fuel_type}</p>
      </div>

      <div className="flex justify-between gap-x-1 bg-primary p-4">
        <p>Damage:</p>
        <p>{vehicle?.primary_damage}</p>
      </div>
    </div>
  );
};

export default VehicleInformation;
