import { useSelector } from "react-redux";
// import { UncontrolledTooltip } from "reactstrap";

export function CommonBidItem({ data }) {
  //   const _refMinBid = React.createRef();
  //   const _refSellarNotMeet = React.createRef();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  //   const [isOpen, setIsOpen] = useState(false);
  //   const [modal, setModal] = useState(false);

  //   const _checkBid = () => {
  //     if (!isAuthenticated) {
  //       setModal(!modal);
  //     } else {
  //       console.log("Send request to the server for query");
  //     }
  //   };

  return (
    <>
      <li className="flex justify-between mb-2">
        <div>Bid Status : </div>

        <div
          className={`text-right text-end ${
            data?.bid_status_name === "Winning"
              ? "text-green-500"
              : data?.bid_status_name === "Out Bid"
              ? "text-yellow-500"
              : ""
          }`}
        >
          {data?.bid_status_name}
        </div>
      </li>
      <li className="flex justify-between">
        <div className="mb-2">Eligibility :</div>
        <div className="text-right">
          {isAuthenticated && user?.approve_for_bidding == 1 ? (
            <span className="text-sm">Eligible to Bid</span>
          ) : isAuthenticated && user?.approve_for_bidding == 2 ? (
            <span>
              <span className="text-sm">Not Eligible to Bid</span>
              <br />
            </span>
          ) : null}

          <i className="fa fa-angle-right ms-1" ariaHidden="true"></i>
        </div>
      </li>
      <li className="flex justify-between mb-2">
        <div>Starting Bid :</div>
        <div className="text-sm">
          AED {data?.start_bid_amount}
          {/* <i className="ms-1 text-primary cursor-pointer" ref={_refMinBid}>
            <SVGIcon iconName="HelpCircle" />
          </i>
          <UncontrolledTooltip
            placement="right"
            target={_refMinBid}
            className="tooltip-style-2 no-space"
          >
            <div className="text-start">
              <h6 className="bg-primary text-white p-2">Minimum Bid</h6>

              <p className="px-3">
                The Seller has placed a reserve price on the lot. If the minimum
                bid is not surpassed during the virtual auction the Seller has
                until 6:00 PM PST one business day after the sale to accept the
                bid.
              </p>
            </div>
          </UncontrolledTooltip> */}
        </div>
      </li>
      <li className="flex justify-between mb-2">
        <div>Current Bid:</div>
        <div className="text-right">
          <h6>AED {data.current_bid_amount ?? ""}</h6>
          {/* <div className="font-semibold text-xs">
            Seller Reserve Not Yet Met */}
          {/* <i
              className="fa fa-question-circle ms-1 text-primary cursor-pointer"
              ref={_refSellarNotMeet}
            ></i>
            <UncontrolledTooltip
              placement="right"
              target={_refSellarNotMeet}
              className="tooltip-style-2 no-space"
            >
              <div className="text-start">
                Seller has placed a reserve price on the lot. If the minimum bid
                is not surpassed during the live auction, Seller has until 6
                p.m. (Pacific Time) on the next business day following the day
                of the auction to accept the bid.
              </div>
            </UncontrolledTooltip> */}
          {/* </div> */}
        </div>
        {/* {modal && (
          <LoginModal modal={modal} setModal={setModal} toggle={_checkBid} />
        )}
        <ApprovalModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      </li>
    </>
  );
}
