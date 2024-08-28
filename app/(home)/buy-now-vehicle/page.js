import BuyNowVehicles from "@/components/cars/BuyNowVehicles";

export const metadata = {
  title : 'GCA | Buy Now Vehicles',
  description : 'Gulf Cars Auction | Salvage Cars Auction Sharjah'
}

const Page = () => {
  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <BuyNowVehicles />
        </div>
      </div>
    </>
  );
};

export default Page;
