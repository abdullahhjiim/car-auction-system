const VehicleInformation = ({ vehicle }) => {
  return (
    <div className="border border-primary rounded overflow-hidden">
      <div className="bg-primary text-white rounded p-3">
        <h4 className="text-lg font-semibold">Vehicle Informations</h4>
      </div>

      <div className="p-3">
        <div>
          <div className="flex flex-col">
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">VIN:</p>
                <p className="font-semibold text-sm">{vehicle?.vin}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Odometer:</p>
                <p className="font-semibold text-sm">{vehicle?.odometer}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Highlights:</p>
                <p className="font-semibold text-sm">{vehicle?.highlight}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Primary Damage:</p>
                <p className="font-semibold text-sm">
                  {vehicle?.primary_damage}
                </p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Seconday Damage:</p>
                <p className="font-semibold text-sm">
                  {vehicle?.secondary_damage}
                </p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Body Style:</p>
                <p className="font-semibold text-sm">{vehicle?.body_style}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Color:</p>
                <p className="font-semibold text-sm">{vehicle?.color}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Engine Type:</p>
                <p className="font-semibold text-sm">{vehicle?.engine_type}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Drive:</p>
                <p className="font-semibold text-sm">{vehicle?.drive_train}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Cylinders:</p>
                <p className="font-semibold text-sm">{vehicle?.cylinder}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Transmission:</p>
                <p className="font-semibold text-sm">{vehicle?.transmission}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Fuel:</p>
                <p className="font-semibold text-sm">{vehicle?.fuel_type}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Keys:</p>
                <p className="font-semibold text-sm">{vehicle?.keys_name}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInformation;
