'use client';
import { authAxios } from '/app/(home)/axious-config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import LoginModal from '../login/login';

const AuctionListCalendar = () => {
  const [data, setData] = useState(null);
  const [valueDate, setValueDate] = useState(new Date());
  const [loading, setLoading] = useState(null);
  const [currentAuctionList, setCurrentAuctionList] = useState([]);
  const [auctionDate, setAuctionDate] = useState([]);
  const [currentKeyAuction, setCurrentKeyAuction] = useState(null);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  const format = (x, y) => {
    var z = {
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds(),
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
      return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2);
    });

    return y.replace(/(y+)/g, function (v) {
      return x.getFullYear().toString().slice(-v.length);
    });
  };

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/auctions/calendar`)
      .then((res) => {
        setData(res?.data);
        setAuctionDate(Object.keys(res?.data));
        setLoading(false);
        let todayKey = format(new Date(), 'dd/MM/yyyy');
        setCurrentAuctionList(res?.data[todayKey] ?? []);
        setCurrentKeyAuction(todayKey);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeCalendar = (e) => {
    setValueDate(e);
    let currentKey = format(e, 'dd/MM/yyyy');
    setCurrentAuctionList(data[currentKey] ?? []);
    setCurrentKeyAuction(currentKey);
  };

  let today = new Date();
  const maxDate = new Date(today.setMonth(today.getMonth() + 1));

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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-3/4">
        <div>
          <p className="font-bold text-left py-3 text-primary font-size-16">
            Auction List: {currentKeyAuction}
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
              {currentAuctionList?.length == 0 && (
                <tr className="bg-white border-b">
                  <td colSpan={5} className="text-center">
                    There are no auctions available at this Date.
                  </td>
                </tr>
              )}
              {currentAuctionList &&
                currentAuctionList.map((e) => {
                  return (
                    <tr key={e.id} className="bg-white border-b">
                      <td className="px-6 py-3">{e.auction_time}</td>
                      <td className="px-6 py-3">{e.auction_yard_name}</td>
                      <td className="px-6 py-3">{e.location_name}</td>
                      <td className="px-6 py-3">{e.total_vehicles}</td>
                      <td className="px-6 py-3">
                        {e.status == 7 && (
                          <button
                            className="py-2 px-8 rounded-md bg-primary text-white text-sm"
                            onClick={() => handleJoin(e?.id)}
                          >
                            Join Auction{' '}
                          </button>
                        )}
                        &nbsp;
                        <Link
                          className="py-2 px-8 rounded-md bg-primary text-white text-sm"
                          href={`/auction-vehicle?auction_id=${e.id}`}
                        >
                          View{' '}
                        </Link>
                        &nbsp;
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
      </div>
      <div className="md:w-1/4">
        <div>
          <p className="font-bold text-left py-3 text-primary font-size-16">
            Auction Calendar
          </p>
        </div>

        <div className="flex flex-col overflow-x-auto w-full">
          <Calendar
            onChange={onChangeCalendar}
            value={valueDate}
            tileClassName={({ activeStartDate, date, view }) => {
              let classes = 'tile';

              auctionDate.some((e) => {
                if (e == format(date, 'dd/MM/yyyy')) {
                  classes = `${classes} dotted`;
                }
              });

              return classes;
            }}
            showNavigation={true}
            showNeighboringMonth={false}
            minDate={new Date()}
            maxDate={maxDate}
          />
        </div>
      </div>
      <LoginModal modal={modal} setModalClose={setModalClose} />
    </div>
  );
};

export default AuctionListCalendar;
