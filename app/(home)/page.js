import About from '@/components/home/About';
import AuctionsList from '@/components/home/AuctionsList';
import BecomeBuyer from '@/components/home/BecomeBuyer';
import BecomeSeller from '@/components/home/BecomeSeller';
import Brands from '@/components/home/Brands';
import BuyNowVehicle from '@/components/home/BuyNow';
import Hero from '@/components/home/Hero';
import MarqueSection from '@/components/home/MarqueSection';
import MobileApp from '@/components/home/MobileApp';
import PopularCars from '@/components/home/PopularCar';
import Services from '@/components/home/Services';
import VehicleAuction from '@/components/home/VehicleAuction';
import VehicleSearch from '@/components/home/VehicleSearch';

export const metadata = {
  title : 'Gulf Cars Auction | Salvage Cars Auction Sharjah',
  description : 'Gulf Cars Auction | Salvage Cars Auction Sharjah, Dubai'
}

export default function Home() {

  return (
    <>
      <MarqueSection />
      <Hero />
      <VehicleSearch />
      <AuctionsList />
      <About />
      <BuyNowVehicle />
      <Services />
      <VehicleAuction />
      <BecomeBuyer />
      <BecomeSeller />
      {/* <WhatWeOffer /> */}
      <Brands />
      <PopularCars />
      {/* <AllAuctions /> */}
      <MobileApp />
    </>
  );
}
