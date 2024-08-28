import Numbers from "@/components/common/Numbers";
import Services from "@/components/home/Services";
import banner from "@/public/banner1.png";
import banner3 from "@/public/banner4.png";
import logo from "@/public/logo.png";
import Image from "next/image";

export const metadata = {
  title: "GCA | About Us",
  description: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
};

const AboutUs = () => {
  return (
    <>
      <div>
        <div className="relative flex justify-center items-center py-24 min-h-[20vh] sm:min-h-[20vh] z-1 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 -z-[1]" />
          <div className="absolute inset-0 w-full h-full -z-[2]">
            <Image
              src={banner}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4">
            <h4 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
              About Us
            </h4>
          </div>
        </div>
        <div className="bg-secondary bg-opacity-30 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
              <div className="w-1/2 sm:w-1/3">
                <Image src={logo} alt="cars" className="text-center w-full" />
              </div>
              <div className="w-1/2 sm:w-2/3">
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl !leading-snug mb-4">
                  Welcome to <br /> Gulf Cars Auction
                </h2>
                <p className="opacity-75 lg:pr-20 xl:pr-36">
                  Where innovation, integrity, and excellence converge to
                  redefine the automotive industry. As a premier destination for
                  buying and selling vehicles, we take pride in offering a
                  modern, transparent, and customer- centric experience.
                </p>
                <br />
                <h3 className="font-bold">Our Vision</h3>
                <p className="opacity-75 lg:pr-20 xl:pr-36">
                  We envision a future where the automotive journey is
                  seamlessly connected, transparently facilitated, and
                  personally tailored to the needs of each customer. Our
                  commitment is to set new standards in the industry, combining
                  cutting-edge technology with a deep understanding of
                  automotive expertise.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-8 items-center sm:flex-row-reverse mt-12">
              <div className="w-1/3">
                <Image
                  src={banner3}
                  alt="cars"
                  className="text-center w-full"
                />
              </div>
              <div className="w-2/3 lg:pr-20 xl:pr-40">
                <h3 className="font-bold">Who We Are</h3>
                <p className="opacity-75">
                  Gulf Cars Auction isn&apos;t just an automotive marketplace;
                  we are a dynamic community of enthusiasts, experts, and
                  professionals dedicated to transforming the way people buy and
                  sell vehicles. Our team brings together a wealth of experience
                  in the automotive and technology sectors, driven by a shared
                  passion for delivering excellence.
                </p>
                <br />
                <h3 className="font-bold">Our Commitment to Integrity</h3>
                <p className="opacity-75">
                  Integrity is the cornerstone of our operations. We adhere to
                  the highest ethical standards, ensuring that our users can
                  trust every transaction on our platform. Transparency,
                  honesty, and fairness guide our interactions as we build
                  lasting relationships with our customers.
                </p>
                <br />
                <h3 className="font-bold">
                  Explore the Future of Automotive Excellence
                </h3>
                <p className="opacity-75">
                  Whether you are looking to buy or sell a vehicle, Gulf Cars
                  Auction invites you to explore the future of automotive
                  excellence. Join us on a journey where technology meets
                  expertise, and every transaction is infused with innovation
                  and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Services />
        <Numbers />
      </div>
    </>
  );
};

export default AboutUs;
