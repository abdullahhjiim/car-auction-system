import logo from "@/public/logo-white.png";
import thankyougif from "@/public/thankyou.gif";
import Image from "next/image";

const Thankyou = () => {
  return (
    <div className="">
      <section className="flex items-center justify-center mt-20">
        <div className="flex flex-col">
          <header className="p-2 w-[800px] bg-primary text-white rounded-md">
            <div className="px-4 mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-[35%]">
                  <Image
                    src={logo}
                    alt="logo"
                    className="max-w-[150px] h-auto"
                  />
                </div>
                <h5 className="flex items-center gap-2 text-2xl md:text-4xl font-medium">
                  Auction Ended
                </h5>
              </div>
            </div>
          </header>
          <div className="flex items-center justify-center">
            <Image src={thankyougif} alt="thank you" height={400} width={400} />
          </div>
          <div className="w-full border-[1px] border-red-500"></div>
        </div>
      </section>
    </div>
  );
};

export default Thankyou;
