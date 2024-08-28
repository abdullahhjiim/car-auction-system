
import AllVehicles from "@/components/cars/AllVehicles";

export const metadata = {
  title : 'GCA | All Vehicles',
  description : 'Explore a wide range of vehicles from popular brands like Mercedes, BMW, Nissan, Toyota, Hyundai, Ford, & Dodge, all in excellent condition & at affordable prices'
}

const Page = () => {
  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <AllVehicles />
        </div>
      </div>
    </>
  );
};

export default Page;
