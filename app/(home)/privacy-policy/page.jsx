import HtmlIframe from "@/components/extra/HtmlFrame";

export const metadata = {
  title: "Gulf Cars Auction | Privacy Policy",
  description: "Gulf Cars Auction | Salvage Car Auction Sharjah",
};

const PrivacyPolicy = () => {
  return (
    <div className="">
      <div className="flex justify-center p-4 bg-gray-700 text-white uppercase font-semibold">
        Privacy Policy
      </div>
      <div className="container">
        <HtmlIframe
          htmlContent={false}
          iframeUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/page-frame/PRIVACY_POLICY`}
          height="700px"
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
