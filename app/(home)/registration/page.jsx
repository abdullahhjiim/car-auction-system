import RegisterForm from "@/components/login/RegisterForm";
import car1 from "@/public/car1.jpg";
import Image from "next/image";

export const metadata = {
  title: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
  description: "Become a registered customer of Gulf Cars Auction.",
};

const Register = () => {
  return (
    <>
      <div
        className="relative flex justify-center items-center min-h-[90vh] z-1"
        style={{ backgroundImage: `url(${car1})` }}
      >
        <Image
          src={car1}
          alt="abstract"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 -z-10" />
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
