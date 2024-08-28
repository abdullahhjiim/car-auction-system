'use client';
import { authAxios } from '/app/(home)/axious-config';
import { getTimezoneAbbreviation } from '/app/(home)/utils/time';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from '../login/login';

const AuctionNowLater = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const [auctionData, setAuctionData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push('/registration?step=4');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  useEffect(() => {
    getAuctionData();
    let intanceInterval = setInterval(() => {
      getAuctionDataIntrval();
    }, 60000);

    return () => clearInterval(intanceInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuctionData = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tz_short = getTimezoneAbbreviation(new Date());

    setLoading(true);

    authAxios
      .post('/auction-dashboard', { timezone, tz_short })
      .then((res) => {
        setAuctionData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err.response);
      });
  };

  const getAuctionDataIntrval = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tz_short = getTimezoneAbbreviation(new Date());

    authAxios
      .post('/auction-dashboard', { timezone, tz_short })
      .then((res) => {
        setAuctionData(res.data);
      })
      .catch((err) => {
        console.log('err', err.response);
      });
  };

  const handleJoin = (auctionId) => {
    if (token) {
      router.push(`/auction-list?auction_id=${auctionId}`);
    } else {
      setModal(true);
    }
  };

  const setModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <div>
        <p className="font-bold text-left py-3 text-primary font-size-16">
          Auction Right Live Now
        </p>
      </div>
      <div className="flex flex-col overflow-x-auto">
        <table className="overflow-x-auto min-w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                Auction At
              </th>
              <th scope="col" className="px-6 py-3">
                Auction Yard
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>

              <th scope="col" className="px-6 py-3">
                Total Vehicle
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              auctionData.live_auctions &&
              auctionData?.live_auctions.length === 0 && (
                <tr className="bg-white border-b">
                  <td colSpan={6} className="text-center">
                    There are no auctions available at this time.
                  </td>
                </tr>
              )}
            {!loading &&
              auctionData.live_auctions &&
              auctionData?.live_auctions.length > 0 &&
              auctionData?.live_auctions.map((e) => {
                return (
                  <tr key={e.id} className="bg-white border-b">
                    <td className="px-6 py-3">{e.auction_time}</td>
                    <td className="px-6 py-3">{e.auction_yard_name}</td>
                    <td className="px-6 py-3">{e.location_name}</td>
                    <td className="px-6 py-3">{e.total_vehicles}</td>
                    <td className="px-6 py-3">
                      <button
                        className="py-2 px-8 rounded-md bg-primary text-white text-sm"
                        onClick={() => handleJoin(e?.id)}
                      >
                        Join Auction{' '}
                      </button>
                      &nbsp;
                      <Link
                        className="py-2 px-8 rounded-md bg-primary text-white text-sm mr-1"
                        href={`/auction-vehicle?auction_id=${e.id}`}
                      >

                        View{' '}

                      </Link>
                      {e.catalog_url && (
                        <a
                          target="_blank"
                          className="py-2 px-8 rounded-md bg-primary text-white text-sm"
                          href={`${e.catalog_url}`}
                        >
                          Car Catalogue
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <p className="font-bold text-left py-3 text-primary font-size-16">
          Auction Later
        </p>
      </div>

      <div className="flex flex-col overflow-x-auto">
        <table className="table-auto overflow-x-auto min-w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                Auction At
              </th>
              <th scope="col" className="px-6 py-3">
                Auction Yard
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>

              <th scope="col" className="px-6 py-3">
                Total Vehicle
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              auctionData.later_today &&
              auctionData?.later_today.length === 0 && (
                <tr className="bg-white border-b">
                  <td colSpan={6} className="text-center">
                    There are no auctions available at this time.
                  </td>
                </tr>
              )}

            {!loading &&
              auctionData.later_today &&
              auctionData?.later_today.length > 0 &&
              auctionData?.later_today.map((e) => {
                return (
                  <tr key={e.id} className="bg-white border-b">
                    <td className="px-6 py-3">{e.auction_at}</td>
                    <td className="px-6 py-3">{e.auction_yard_name}</td>
                    <td className="px-6 py-3">{e.location_name}</td>
                    <td className="px-6 py-3">{e.total_vehicles}</td>
                    <td className="px-6 py-3">
                      <Link
                        className="py-2 px-8 rounded-full bg-primary text-white text-sm mr-2"
                        href={`/auction-vehicle?auction_id=${e.id}`}
                      >
                        View{' '}
                      </Link>
                      {e.catalog_url && (
                        <a
                          target="_blank"
                          className="py-2 px-8 rounded-full bg-primary text-white text-sm"
                          href={`${e.catalog_url}`}
                        >
                          Car Catalogue
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <LoginModal modal={modal} setModalClose={setModalClose} />
    </>
  );
};

export default AuctionNowLater;
