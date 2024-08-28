// const selectOptions = ["Default", "Price Low To High", "Price High To Low"];
import { setAuctionSound } from "@/app/(home)/features";
import { GoBell, GoBellSlash } from "react-icons/go";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Topbar = ({ auction, index, removeAuction, removeShow }) => {
  const dispatch = useDispatch();
  const showSwal = (message) => {
    withReactContent(Swal)
      .fire({
        title: "Are you sure to remove?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#B20A0B",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          removeAuction();
        }
      });
  };

  const handleSound = () => {
    let sound = !auction?.auctionSound;
    dispatch(setAuctionSound({ index, sound }));
  };

  return (
    <div className="py-2 px-4 bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-2">
      <h4 className="text-lg sm:text-xl font-semibold text-center sm:text-start">
        {!auction.auction_ended
          ? `Auction List- Dubai - ${auction?.total_participants} Participants`
          : "Auction List"}
      </h4>

      <div className="flex gap-3 items-center">
        <div className="cursor-pointer" onClick={handleSound}>
          {auction?.auctionSound ? <GoBell /> : <GoBellSlash />}
        </div>

        <h4 className="text-lg font-semibold text-center sm:text-start">
          {!auction.auction_ended
            ? `${auction?.total_remaining_items} Left`
            : ""}
        </h4>
        {removeShow && (
          <button
            onClick={() => showSwal()}
            className="p-1 bg-red-500 rounded-md"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
