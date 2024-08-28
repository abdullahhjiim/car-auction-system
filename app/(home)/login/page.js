
import LoginForm from "@/components/login/LoginForm";
import car1 from "@/public/car1.jpg";
import Image from "next/image";

export const metadata = {
  title: "Gulf Cars Auction | Salvage Cars Auction Sharjah",
  description: "Get access to wide range of vehicles and credible buyers/sellers",
};

const Login = () => {
  
  return (
    <>
      <div className="flex min-h-[60vh] md:min-h-[90vh]">
        <div className="hidden md:block md:w-[44%]">
          <div className="flex justify-center items-center h-full w-full max-h-[90vh]">
            <Image
              src={car1}
              alt="abstract"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
