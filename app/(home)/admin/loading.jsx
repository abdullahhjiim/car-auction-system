import Image from "next/image";

const Loading = () => {
  return (
    <div className="container px-32 py-16 flex justify-center">
      <Image
        src={"/loading_gif.gif"}
        width={400}
        height={400}
        alt="loading image for gulf auction"
      />
    </div>
  );
};

export default Loading;
