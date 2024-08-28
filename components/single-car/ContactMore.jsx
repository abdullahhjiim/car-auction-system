const { FaWhatsapp, FaMailBulk } = require("react-icons/fa");

const ContactMore = ({ vehicle }) => {
  return (
    <div className="border border-primary rounded overflow-hidden mt-4">
      <div className="bg-primary text-white rounded p-2">
        <h4 className="text-lg font-semibold">
          Share it with Friends and Family
        </h4>
      </div>

      <div className="p-3">
        <div className="flex flex-col md:flex-row justify-center gap-2">
          <div className="flex bg-[#128C7E] p-1 item-ceter rounded-md text-white w-[140px]">
            <div className="mt-2 px-1">
              <FaWhatsapp />
            </div>
            <a
              className="m-1"
              target="_blank"
              href={`https://web.whatsapp.com/send?text=Checkout this car from ${process.env.NEXT_PUBLIC_APP_NAME}: https://gulfauctions.online/all-vehicle/${vehicle?.lot_number}`}
            >
              {`WhatsApp`}
            </a>
          </div>
          <div className="flex bg-primary p-1 p-y-2 item-ceter rounded-md text-white ">
            <div className="mt-2 px-2">
              <FaMailBulk />
            </div>
            <a className="m-1" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
              {`Mail`}
            </a>
          </div>
          {/* <div className="flex bg-primary p-1 p-y-2 item-ceter rounded-md text-white ">
            <div className="mt-2 px-2">
              <FaMailBulk />
            </div>
            <a className="m-1" target="_blank" href={`/contact-us`}>
              {`Contact`}
            </a>
            <ShareOnMessenger
              url={`https://gulfauctions.online/all-vehicle/${vehicle?.lot_number}`}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactMore;
