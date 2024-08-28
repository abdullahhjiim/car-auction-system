import AuctionVehicles from "@/components/cars/AuctionVehicles";

export const metadata = {
  title : 'GCA | Auction Vehicles',
  description : 'Gulf Cars Auction | Salvage Cars Auction Sharjah'
}

const Page =  () => {
  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
        <AuctionVehicles />
        </div>
      </div>
    </>
  );
};

export default Page;
