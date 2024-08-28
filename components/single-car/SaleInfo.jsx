const SaleInfo = ({ vehicle }) => {
  return (
    <div className="border border-primary rounded overflow-hidden">
      <div className="bg-primary text-white rounded p-3">
        <h4 className="text-lg font-semibold">Auction Informations</h4>
      </div>

      <div className="p-3">
        <div>
          <div className="flex flex-col">
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Location :</p>
                <p className="font-semibold text-sm">
                  {vehicle.auction_yard_name}
                </p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Sale Date :</p>
                <p className="font-semibold text-sm">{vehicle.sale_date}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Yard Name :</p>
                <p className="font-semibold text-sm">{vehicle?.sale_name}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Serial :</p>
                <p className="font-semibold text-sm">{vehicle?.serial}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>

            {/* <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Lane/Item/Row :</p>
                <p className="font-semibold text-sm">
                  {vehicle.lane}
                  {vehicle?.item_number
                    ? `/ ${vehicle?.item_number}`
                    : null}{" "}
                  {vehicle?.row ? `/ ${vehicle.row}` : null}
                </p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div> */}

            <div>
              <div className="flex justify-between gap-x-1 py-1">
                <p className="font-semibold text-sm">Last Updated :</p>
                <p className="font-semibold text-sm">{vehicle?.updated_at}</p>
              </div>
              <div className="bg-primary w-full h-[1px] my-1 bg-opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInfo;
