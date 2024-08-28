import AuctionMechanismList from "@/components/auction/AuctionMechanismList";

export const metadata = {
  title : 'Gulf Cars Auction | Salvage Cars Auction Sharjah',
  description : 'Gulf Cars Auction | Salvage Cars Auction Sharjah'
}
export default function AuctionList() {
  
  return (
    <>
      <section className="">
        <AuctionMechanismList />
      </section>
    </>
  );
}
