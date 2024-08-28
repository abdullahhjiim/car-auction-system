import { pageDataByEvent } from "@/lib/page";

const page = async () => {
    const data = await pageDataByEvent('PRIVACY_POLICY');

  return (
    <div className="my-12">
      <div dangerouslySetInnerHTML={{ __html: data?.data?.body }}></div>
    </div>
  );
};

export default page;
