import { getNumbers } from "@/lib/about/aboutus";

const NumberData = async () => {
  const data = await getNumbers("revalidated");

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center text-white">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">{data?.inventory}</h2>
          <p className="uppercase">Vehicle in Stock</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {data?.sold_vehicle}
          </h2>
          <p className="uppercase">Vehicle Delivered</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {data?.total_member}
          </h2>
          <p className="uppercase">Happy Customers</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            {data?.total_seller}
          </h2>
          <p className="uppercase">Trusted Sellers</p>
        </div>
      </div>
    </div>
  );
};

export default NumberData;
