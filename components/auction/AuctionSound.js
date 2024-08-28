/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const AuctionSound = ({ auction, userId }) => {
  useEffect(() => {
    if (auction?.auctionSound) {
      if (auction?.event === "BID_ENDED") {

        if (auction?.msg != "Sold") {
          new Audio("/audio/auction_sound/Sold.mp3").play();
        } 
      
      } else if (auction?.event === "NEW_BID") {
        if (
          auction?.bid_detail &&
          auction?.bid_detail?.user_id &&
          auction?.bid_detail &&
          auction?.bid_detail?.user_id === userId
        ) {
          new Audio("/audio/auction_sound/MyBid.mp3").play();
        } else {
          new Audio("/audio/auction_sound/OtherBid.mp3").play();
        }
      } else if (auction?.event === "READY_TO_BID") {
        new Audio("/audio/auction_sound/StartItem.mp3").play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auction.event, userId, auction.bid_detail, auction.msg]);

  return null;
};

export default React.memo(AuctionSound);
