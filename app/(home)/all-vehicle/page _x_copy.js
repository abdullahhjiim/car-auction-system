'use client';

import CarList from '@/components/cars/CarList';
import Pagination from '@/components/cars/Pagination';
import { Accordion } from 'flowbite-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaThList, FaTimes } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import '../cars/CarSidebar.css';
import { authAxios } from '/app/(home)/axious-config';
import lotTitle from '/app/(home)/utils/lotTitile';
import {
  isSearchData,
  makeDate,
  makefilterData,
  makeParamsToText,
  updatefilterData,
} from '/app/(home)/utils/makeDataForRequest';

const Page = () => {
  const [isGrid, setIsGrid] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [meta, setMeta] = useState(10);
  const [lotData, setLotData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [years, setYears] = useState([]);
  const [selectedYearMin, setSelectedMin] = useState();
  const [selectedYearMax, setSelectedMax] = useState();
  const [loading, setLoading] = useState(false);
  const [newlyAdded, setNewlyAdded] = useState('last_24_hours');
  const [newlySwiched, setNewlySwiched] = useState(false);
  const [paramsKeys, setParamsKeys] = useState([]);
  const [firstTimeLoading, setFirstTimeLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('DESC');
  const [sortColumn, setSortColumn] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [watchLoading, setWatchLoading] = useState(false);
  const [vinOrLot, setVinOrLot] = useState('');

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const range = useRef(null);
  const [limit, setLimit] = useState(20);

  const [modal, setModal] = useState(false);
  const [savedModal, setSavedModal] = useState(false);
  const [savedUrl, setSavedUrl] = useState('');
  const [savedSearchData, setSavedSearchData] = useState([]);
  const [addedSavedSearch, setAddedSavedSearch] = useState({});

  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [type, setType] = useState('');
  const [modalExport, setModalExport] = useState(false);
  const [viewType, setViewType] = useState(false);
  const [price, setPrice] = useState({ value: { min: min, max: max } });
  const [id, setId] = useState('');
  const [toggler, setToggler] = useState(false);

  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.required_documents) {
        router.push('/registration?step=4');
      } else {
        _fetchLotData(_makeQueryText(), true);
      }
    } else {
      _fetchLotData(_makeQueryText(), true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  // custom varialbe
  // const _limit = meta && meta.per_page;
  const from = meta && meta.from;
  const to = meta && meta.to;
  const total = meta && meta.total;

  const _global_search = router.query?.vehicle_global_search;
  const queryObject = Object.fromEntries([...searchParams]);

  // useEffect(() => {
  //   _fetchLotData(_makeQueryText(), true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const _makeQueryText = () => {
    let result = searchParams.toString();
    let keys = [];

    for (const key of searchParams.keys()) {
      keys.push(key);
    }

    setParamsKeys(keys);

    const _page = searchParams.get('page');

    if (_page) {
      const _pageResult = Number(_page) > 1 ? Number(_page) - 1 : 0;

      setPage(_pageResult);
    }

    return result;
  };

  // Fetch Lot Data
  const _fetchLotData = (params, firstLoading) => {
    const url = params ? '/lot/search?' + params : '/lot/search';
    router.push(pathname + '?' + params);

    if (firstLoading) {
      setFirstTimeLoading(true);
    }
    setLoading(true);

    authAxios
      .get(url)
      .then((res) => {
        setLotData(res.data.data);
        setMeta(res.data.meta);

        let makeFilterObj = {};

        Object.keys(res.data.filter_options).map((key) => {
          const filter_options_data = res.data.filter_options[key];

          if (Array.isArray(filter_options_data)) {
            if (key !== 'newly_added_vehicles') {
              const remove_s = key.slice(0, -1);
              const make_key = remove_s + '_ids';

              makeFilterObj[make_key] = filter_options_data;
            }
            if (key === 'newly_added_vehicles') {
              const newly_added_vehicle = key.slice(0, -1);

              makeFilterObj[newly_added_vehicle] = filter_options_data;
            }
          } else {
            makeFilterObj[key] = filter_options_data;
          }
        });

        setFilterData(makeFilterObj);

        setLimit(res.data?.meta?.per_page);

        // Year
        _makeYear(res.data.filter_options);

        // Make Year
        _makeOdometer(res.data.filter_options);

        // Make Sale Date
        _makeSaleDate(res.data.filter_options?.sale_date);

        // set Vin or lot
        setVinOrLot(res.data.filter_options?.vin_lot);

        if (firstLoading) {
          setFirstTimeLoading(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (firstLoading) {
          setFirstTimeLoading(false);
        }
      });
  };

  // For PageCount
  // useEffect(() => {
  //   if (total !== undefined) {
  //     setPageCount(Math.ceil(total / limit));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [total, limit]);

  // Make Year
  const _makeYear = (filter_options) => {
    const data = filter_options && filter_options.year;

    if (data) {
      let yearList = [];

      const { start, end, start_selected, end_selected } = data;
      const defaultSelectMin = end - 10;

      if (start_selected >= start && end_selected >= start) {
        setSelectedMin(start_selected);
        setSelectedMax(end_selected);
      } else {
        setSelectedMin(defaultSelectMin);
        setSelectedMax(end);
      }

      for (let index = end; index >= start; index--) {
        yearList.push({
          label: index,
          value: index,
        });
      }

      setYears(yearList);
    }
  };

  // Make Odometer
  const _makeOdometer = (filter_options) => {
    const odometer = filter_options && filter_options.odometer;

    // Odometer
    if (odometer) {
      const { max, min, min_selected, max_selected } = odometer;
      setMin(min);
      setMax(max);

      if (min < max_selected) {
        setPrice({ value: { min: min_selected, max: max_selected } });
      } else {
        setPrice({ value: { min: min, max: max } });
      }
    }
  };

  // Make Sale Date
  const _makeSaleDate = (data) => {
    if (data) {
      const { end_selected, start_selected } = data;

      if (end_selected && start_selected) {
        const _end_selected = new Date(end_selected);
        const _start_selected = new Date(start_selected);

        setEndDate(_end_selected);
        setStartDate(_start_selected);
      }
    }
  };

  // Handle On Change
  const _handleOnChangeBox = (e, key) => {
    // Update Filter Data
    const _updatefilterData = updatefilterData(filterData, e, key);

    const data = {
      ...filterData,
      [key]: _updatefilterData,
    };
    setFilterData(data);

    const responsObject = makefilterData(data);

    _handleMakeQueryParams(responsObject);
  };

  // Handle Make Query Params
  const _handleMakeQueryParams = (searchParams, isGlobal) => {
    setPage(0);

    const _global_search = router?.query?.vehicle_global_search;

    let result = makeParamsToText(searchParams);

    if (_global_search && !isGlobal) {
      result += `vehicle_global_search=${_global_search}&`;
    }

    if (result.length > 0) {
      result = result.slice(0, -1);
    }

    _fetchLotData(result);
  };

  // Query Params With Pagination
  const _handleMakeQueryParamsWithPage = (searchParams) => {
    let result = makeParamsToText(searchParams);

    if (result.length > 0) {
      result = result.slice(0, -1);
    }

    let _reqText = '';

    if (sortColumn) {
      _reqText = `&order_by_column=${sortColumn}&order_by=${orderBy}`;
    } else {
      _reqText = `&order_by=${orderBy}`;
    }

    _fetchLotData(`${result}${_reqText}`);
  };

  // Submit Odometer
  const _handleSubmitOdometer = (e) => {
    e.preventDefault();
    const { odometer } = filterData;

    const data = {
      ...filterData,
      odometer: {
        ...odometer,
        min_selected: price.value.min,
        max_selected: price.value.max,
      },
    };

    const responsObject = makefilterData(data);

    _handleMakeQueryParams(responsObject);
  };

  // Submit Vin Lot
  const _handleSubmitVinOrLot = (e) => {
    e.preventDefault();

    if (vinOrLot.length > 0) {
      const data = {
        ...filterData,
        vin_lot: vinOrLot,
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    }
  };

  // Handle Change Year
  const _handleChangeYear = (e, type) => {
    if (type === 'max') {
      setSelectedMax(e);
    } else if (type === 'min') {
      setSelectedMin(e);
    }
  };

  // Handle Change Year
  const _handleSubmitYear = (e) => {
    e.preventDefault();

    const { year } = filterData;

    const data = {
      ...filterData,
      year: {
        ...year,
        start_selected: selectedYearMin,
        end_selected: selectedYearMax,
      },
    };

    const responsObject = makefilterData(data);

    _handleMakeQueryParams(responsObject);
  };

  // handle pagination
  // const _handlePangation = (pc) => {
  //   const pageNum = pc.selected === 0 ? 1 : pc.selected + 1;

  //   setPage(pc.selected);

  //   const responsObject = makefilterData(filterData);
  //   _handleMakeQueryParamsWithPage({ ...responsObject, page: pageNum, limit });
  // };

  const _handlePangation = (page) => {
    setPage(page);

    const responsObject = makefilterData(filterData);
    _handleMakeQueryParamsWithPage({ ...responsObject, page: page, limit });
  };

  // Reset All
  const _handleResetAll = () => {
    _handleMakeQueryParams({}, true);
    setStartDate('');
    setEndDate('');
    setNewlySwiched(false);
  };

  const _onChangeDate = (e, type) => {
    if (type === 'start') {
      setStartDate(e);

      if (endDate) {
        const _endDate = makeDate(endDate);
        const _startDate = makeDate(e);

        setFilterData({
          ...filterData,
          sale_date: {
            start_selected: _startDate,
            end_selected: _endDate,
          },
        });

        const data = {
          ...filterData,
          sale_date: {
            start_selected: _startDate,
            end_selected: _endDate,
          },
        };

        const responsObject = makefilterData(data);

        _handleMakeQueryParams(responsObject);
      }
    } else {
      setEndDate(e);

      if (startDate) {
        const _startDate = makeDate(startDate);
        const _endDate = makeDate(e);

        setFilterData({
          ...filterData,
          sale_date: {
            start_selected: _startDate,
            end_selected: _endDate,
          },
        });

        const data = {
          ...filterData,
          sale_date: {
            start_selected: _startDate,
            end_selected: _endDate,
          },
        };

        const responsObject = makefilterData(data);

        _handleMakeQueryParams(responsObject);
      }
    }
  };

  const handleSearchChange = (e, data, label) => {
    if (label !== type) {
      setSearchText('');
    }
    const filteredData = data?.filter((i) => {
      if (i?.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });

    setSearchText(e.target.value);
    setType(label);

    setSearchData(filteredData);
  };

  const _handleOdometer = (e) => {
    setPrice({ value: e });
  };
  const _handleOdometerInputs = (e, type) => {
    const { value } = e.target;

    if (type === 'min') {
      const _value = price.value.max <= Number(value) ? 0 : Number(value);

      setPrice({
        value: {
          min: _value,
          max: price.value.max,
        },
      });
    } else {
      setPrice({
        value: {
          min: price.value.min,
          max: Number(value),
        },
      });
    }
  };

  // Handle Colse Year
  const _hanleCloseYear = (key) => {
    if (key === 'year') {
      const year = filterData[key];

      setFilterData({
        ...filterData,
        year: {
          ...year,
          start_selected: 0,
          end_selected: 0,
        },
      });

      const data = {
        ...filterData,
        year: {
          ...year,
          start_selected: 0,
          end_selected: 0,
        },
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    } else if (key === 'odometer') {
      const odometer = filterData[key];

      setMinVal(min);
      setMaxVal(max);
      minValRef.current = min;
      maxValRef.current = max;

      setFilterData({
        ...filterData,
        year: {
          ...odometer,
          start_selected: 0,
          end_selected: 0,
        },
      });

      const data = {
        ...filterData,
        odometer: {
          ...odometer,
          min_selected: 0,
          max_selected: 0,
        },
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    } else if (key === 'newly_added_vehicle') {
      setNewlySwiched(false);

      const updateNewlyAdded = filterData.newly_added_vehicle.map((e) => {
        return {
          ...e,
          is_selected: false,
        };
      });

      setFilterData({
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      });

      const data = {
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    } else if (key === 'sale_date') {
      setStartDate('');
      setEndDate('');

      setFilterData({
        ...filterData,
        sale_date: {},
      });

      const data = {
        ...filterData,
        sale_date: {},
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    } else if (key === 'vin_lot') {
      setFilterData({
        ...filterData,
        vin_lot: '',
      });

      const data = {
        ...filterData,
        vin_lot: '',
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    }
  };

  // On Change New Vehicle
  const _handleChangeNewVehicle = (e) => {
    const _value = e.target.value;
    setNewlyAdded(_value);
    if (newlySwiched) {
      const updateNewlyAdded = filterData.newly_added_vehicle.map((e) => {
        if (e.key === _value) {
          return {
            ...e,
            is_selected: true,
          };
        } else {
          return {
            ...e,
            is_selected: false,
          };
        }
      });

      setFilterData({
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      });
      const data = {
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      };
      const responsObject = makefilterData(data);
      _handleMakeQueryParams(responsObject);
    }
  };

  // Handle Submit Newly Add
  const _handleSubmitNewlyAdd = (e) => {
    if (newlySwiched) {
      const updateNewlyAdded = filterData.newly_added_vehicle.map((e) => {
        return {
          ...e,
          is_selected: false,
        };
      });

      setFilterData({
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      });

      const data = {
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    } else {
      const updateNewlyAdded = filterData.newly_added_vehicle.map((e) => {
        if (e.key === newlyAdded) {
          return {
            ...e,
            is_selected: true,
          };
        } else {
          return {
            ...e,
            is_selected: false,
          };
        }
      });

      setFilterData({
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      });

      const data = {
        ...filterData,
        newly_added_vehicle: updateNewlyAdded,
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    }

    setNewlySwiched(!newlySwiched);

    if (newlySwiched) {
      setNewlyAdded('last_24_hours');
    }
  };

  // Handle Reset
  const _handleReset = (key) => {
    if (
      key === 'odometer' ||
      key === 'year' ||
      key === 'sale_date' ||
      key === 'vin_lot'
    ) {
      _hanleCloseYear(key);
    } else {
      const updatefilterData = filterData[key].map((el) => {
        return {
          ...el,
          checked: false,
        };
      });

      setFilterData({
        ...filterData,
        [key]: updatefilterData,
      });

      const data = {
        ...filterData,
        [key]: updatefilterData,
      };

      const responsObject = makefilterData(data);

      _handleMakeQueryParams(responsObject);
    }
  };

  // Handle Sort Select
  const _handleOrderByColumn = (e) => {
    const value = e.target.value;
    setSortColumn(value);

    // const _paramText = _makeQueryText();
    let _reqText = '';

    if (value) {
      _reqText = `order_by_column=${value}`;
    }

    _fetchLotData(`${_reqText}`);
  };

  // Hande Sort Order By
  const _handleOrderBy = () => {
    // setSortStatus(!sortStatus);
    const orderByText = orderBy === 'DESC' ? 'ASC' : 'DESC';
    if (orderBy === 'DESC') {
      setOrderBy('ASC');
    } else {
      setOrderBy('DESC');
    }

    const _paramText = _makeQueryText();
    let _reqText = '';

    if (sortColumn) {
      _reqText = `&order_by_column=${sortColumn}&order_by=${orderByText}`;
    } else {
      _reqText = `&order_by=${orderByText}`;
    }

    _fetchLotData(`${_paramText}&${_reqText}`);
  };

  const _handnleLimit = (e) => {
    const value = e.target.value;
    setLimit(value);

    const responsObject = makefilterData(filterData);

    _handleMakeQueryParams({ ...responsObject, page: page, limit: value });
  };

  // const checkFilterData = availabelFilterData();
  const checkFilterData = isSearchData(filterData);

  const toggleModal = () => {
    setModal(!modal);
  };

  const _reqSavedSearch = (result) => {
    _fetchLotData(result);
  };

  const _closeGlobalSearch = () => {
    _handleMakeQueryParams(makefilterData(filterData), true);
  };

  const _handleView = (e) => {
    setViewType(e);
  };

  const _handleWatch = (id) => {
    if (!isAuthenticated) {
      setModal(!modal);
    } else {
      const _findLotdata = lotData.find((e) => e.id === id);
      const _is_watched = _findLotdata?.is_watched ? false : true;

      setWatchLoading(true);
      setId(id);

      authAxios
        .post(`vehicles/${id}/toggle-watch`, {
          watched: _is_watched,
        })
        .then((res) => {
          setWatchLoading(false);

          const _updateLot = lotData.map((e) => {
            if (e.id === id) {
              return {
                ...e,
                is_watched: _is_watched,
              };
            } else {
              return e;
            }
          });

          setLotData(_updateLot);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  // Make Array to Filter Data
  const makeArrToFilterData = Object.keys(filterData).map((filter) => {
    return {
      label: filter,
      data: filterData[filter],
    };
  });

  const finalArrFilter = makeArrToFilterData.filter((e) => {
    if (
      e.label == 'odometer' ||
      e.label == 'year' ||
      e.label == 'sale_date' ||
      e.label == 'vin_lot'
    ) {
      return e;
    } else if (
      Array.isArray(e.data) &&
      e.data.length > 0 &&
      e.label !== 'newly_added_vehicle'
    ) {
      return e;
    }
  });

  const _MakeAccordionItem = (obj) => {
    let item = '';

    if (Array.isArray(obj.data) && obj.data.length > 0) {
      item = (
        <Accordion.Panel collapse={true} ariaExpanded={true} key={obj.label}>
          <hr className="my-1" />
          <Accordion.Title className="text-lg font-bold">
            {lotTitle(obj.label)}
          </Accordion.Title>
          <Accordion.Content>
            {queryObject.hasOwnProperty(obj.label) && (
              <div className="flex justify-end">
                <div
                  onClick={() => {
                    _handleReset(obj.label);
                  }}
                  className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300"
                >
                  Reset
                </div>
              </div>
            )}

            <form action="">
              <input
                type="text"
                min={0}
                className="input-with-shadow w-full my-2"
                value={obj?.label === type ? searchText : ''}
                placeholder="Search..."
                onChange={(e) => handleSearchChange(e, obj?.data, obj.label)}
              />
              <div className="flex flex-col gap-y-2 max-h-[200px] overflow-y-auto ml-2">
                {obj.data.length > 0 &&
                  (searchText && obj?.label === type
                    ? searchData
                    : obj.data
                  ).map((option, ind) => {
                    const { id, name, checked, count } = option;
                    return (
                      <label key={ind}>
                        <input
                          type="checkbox"
                          className="mr-2 w-4 h-4"
                          checked={checked}
                          onChange={(event) =>
                            _handleOnChangeBox(option, obj.label)
                          }
                        />
                        {name}({count})
                      </label>
                    );
                  })}
              </div>
            </form>
          </Accordion.Content>
        </Accordion.Panel>
      );
    } else if (obj.label === 'odometer') {
      item = (
        <Accordion.Panel
          onFocus="bg-transparent"
          onFocusCapture="bg-transparent"
          className="focus:!bg-transparent"
          collapse={false}
          key={obj.label}
        >
          <hr className="my-1" />
          <Accordion.Title className="text-lg font-bold">
            Odometer
          </Accordion.Title>
          <Accordion.Content>
            {/* <div className="flex justify-end">
              <div className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300">
                Reset
              </div>
            </div> */}
            {queryObject.hasOwnProperty(obj.label) && (
              <div className="flex justify-end">
                <div
                  onClick={() => {
                    _handleReset(obj.label);
                  }}
                  className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300"
                >
                  Reset
                </div>
              </div>
            )}
            <form action="">
              <div className="flex justify-between items-center gap-x-3 mt-2">
                <input
                  type="number"
                  min={0}
                  className="input-with-shadow w-full"
                  placeholder="0"
                  value={price.value.min}
                  onChange={(e) => _handleOdometerInputs(e, 'min')}
                />
                <input
                  type="number"
                  min={0}
                  className="input-with-shadow w-full"
                  placeholder="250000"
                  value={price.value.max}
                  onChange={(e) => _handleOdometerInputs(e, 'max')}
                />
              </div>
              <div className="text-end">
                <button
                  onClick={_handleSubmitOdometer}
                  className="bg-primary text-white font-bold hover:bg-opacity-90 py-1 px-4 rounded-md duration-300 mt-4"
                >
                  Apply
                </button>
              </div>
            </form>
          </Accordion.Content>
        </Accordion.Panel>
      );
    } else if (obj.label === 'year') {
      item = (
        <Accordion.Panel aria-expanded={true} key={obj.label}>
          <hr className="my-1" />
          <Accordion.Title className="text-lg font-bold">Year</Accordion.Title>
          <Accordion.Content>
            {queryObject.hasOwnProperty(obj.label) && (
              <div className="flex justify-end">
                <div
                  onClick={() => {
                    _handleReset(obj.label);
                  }}
                  className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300"
                >
                  Reset
                </div>
              </div>
            )}
            <form action="">
              <div className="flex justify-between items-center gap-x-3 mt-2">
                <select
                  required
                  key={'select_one'}
                  name="year"
                  id="year"
                  value={selectedYearMin}
                  onChange={(e) => _handleChangeYear(e.target.value, 'min')}
                  className="bg-white p-3 rounded-lg focus:border-0 focus:outline-none w-full max-h-[100px] overflow-y-auto input-with-shadow"
                >
                  {/* <option className="uppercase" defaultValue="1990" hidden>
                      {yearOptions[yearOptions.length - 1]}
                    </option> */}
                  {years.map((option, i) => (
                    <>
                      <option
                        className="uppercase"
                        value={option.value}
                        key={i}
                      >
                        {option.label}
                      </option>
                    </>
                  ))}
                </select>
                <select
                  required
                  key={'select_two'}
                  name="year"
                  id="year"
                  value={selectedYearMax}
                  onChange={(e) => _handleChangeYear(e.target.value, 'max')}
                  className="bg-white p-3 rounded-lg focus:border-0 focus:outline-none w-full max-h-[100px] overflow-y-auto input-with-shadow"
                >
                  {/* <option className="uppercase" defaultValue="1990" hidden>
                      {yearOptions[0]}
                    </option> */}
                  {years.map((option, i) => (
                    <>
                      <option
                        className="uppercase"
                        value={option.value}
                        key={i}
                      >
                        {option.label}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="text-end">
                <button
                  onClick={_handleSubmitYear}
                  className="bg-primary text-white font-bold hover:bg-opacity-90 py-1 px-4 rounded-md duration-300 mt-4"
                >
                  Apply
                </button>
              </div>
            </form>
          </Accordion.Content>
        </Accordion.Panel>
      );
    } else if (obj.label === 'sale_date') {
      item = (
        <Accordion.Panel
          onFocus="bg-transparent"
          onFocusCapture="bg-transparent"
          className="focus:!bg-transparent"
          ariaExpanded={true}
          key={obj.label}
        >
          <hr className="my-1" />
          <Accordion.Title className="text-lg font-bold">
            Sale Date
          </Accordion.Title>
          <Accordion.Content>
            {/* <div className="flex justify-end">
              <div className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300">
                Reset
              </div>
            </div> */}
            {queryObject.hasOwnProperty(obj.label) && (
              <div className="flex justify-end">
                <div
                  onClick={() => {
                    _handleReset(obj.label);
                  }}
                  className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300"
                >
                  Reset
                </div>
              </div>
            )}
            {/* <form action=""> */}
            <div className="flex flex-col justify-between items-center gap-3 mt-2">
              <div className="flex w-full justify-between gap-x-1">
                <p className="text-sm">From:</p>
                <input
                  type="date"
                  name="saleDateFrom"
                  id="saleDateFrom"
                  onChange={(e) => _onChangeDate(e.target.value, 'start')}
                  className="border rounded-md p-1"
                />
              </div>
              <div className="flex w-full justify-between gap-x-1">
                <p className="text-sm">To:</p>
                <input
                  type="date"
                  name="saleDateTo"
                  id="saleDateTo"
                  onChange={(e) => _onChangeDate(e.target.value, 'end')}
                  className="border rounded-md p-1"
                />
              </div>
            </div>
            {/* <div className="text-end">
                <button
                  type="submit"
                  className="bg-primary text-white font-bold hover:bg-opacity-90 py-2 px-4 rounded-md duration-300 mt-4"
                >
                  Apply
                </button>
              </div> */}
            {/* </form> */}
          </Accordion.Content>
        </Accordion.Panel>
      );
    } else if (obj.label === 'vin_lot') {
      item = (
        <Accordion.Panel
          onFocus="bg-transparent"
          onFocusCapture="bg-transparent"
          className="focus:!bg-transparent"
          collapse={false}
          key={obj.label}
        >
          <hr className="my-1" />
          <Accordion.Title className="text-lg font-bold">
            Vin / Lot Number
          </Accordion.Title>
          <Accordion.Content>
            {queryObject.hasOwnProperty(obj.label) && (
              <div className="flex justify-end">
                <div
                  onClick={() => {
                    _handleReset(obj.label);
                  }}
                  className="mt-2 border border-primary border-opacity-50 flex justify-center hover:bg-primary hover:text-white text-primary font-bold p-1 px-2 rounded-md cursor-pointer duration-300"
                >
                  Reset
                </div>
              </div>
            )}
            <form action="">
              <div className="flex justify-between items-center gap-x-3 mt-2">
                <input
                  type="text"
                  className="input-with-shadow w-full"
                  placeholder="Vin or Lot Number"
                  value={vinOrLot}
                  onChange={(e) => setVinOrLot(e.target.value)}
                />
              </div>
              <div className="text-end">
                <button
                  onClick={_handleSubmitVinOrLot}
                  className="bg-primary text-white font-bold hover:bg-opacity-90 py-1 px-4 rounded-md duration-300 mt-4"
                >
                  Apply
                </button>
              </div>
            </form>
          </Accordion.Content>
        </Accordion.Panel>
      );
    }

    return item;
  };

  const resultArr = [];
  let increment = 1;
  finalArrFilter.forEach((item) => {
    if (item?.label == 'vin_lot') {
      resultArr[0] = item;
    } else {
      resultArr[increment] = item;
      increment++;
    }
  });


  return (
    <>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-11">
            <div className="col-span-3 lg:col-span-1">
              <div className="bg-white shadow-light rounded-md p-2 md:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="font-bold text-xl">Search Filters</h2>
                  <p
                    className="text-primary font-bold cursor-pointer"
                    onClick={_handleResetAll}
                  >
                    Reset All
                  </p>
                </div>

                {/* active filters */}
                <div>
                  <div className="flex flex-wrap gap-2 ">
                    {Object.keys(filterData).map((key) => {
                      let obj = filterData[key];

                      if (Array.isArray(obj) && obj.length > 0) {
                        if (key !== 'newly_added_vehicle') {
                          return filterData[key]
                            .filter((item) => item.checked)
                            .map((item, i) => {
                              if (item.checked) {
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center gap-x-1 border rounded-full p-1"
                                  >
                                    <h4 className="text-sm">{item.name}</h4>{' '}
                                    <FaTimes
                                      onClick={() =>
                                        _handleOnChangeBox(item, key, 'array')
                                      }
                                      className="cursor-pointer hover:text-primary"
                                    />
                                  </div>
                                );
                              }
                            });
                        } else if (key === 'newly_added_vehicle') {
                          return (
                            obj &&
                            obj.length > 0 &&
                            obj.map((e, i) => {
                              if (e.is_selected) {
                                return (
                                  <div
                                    key={i}
                                    className="flex items-center gap-x-1 border rounded-full p-1"
                                  >
                                    <h4 className="text-sm">{e.label}</h4>{' '}
                                    <FaTimes
                                      onClick={() => _hanleCloseYear(key)}
                                      className="cursor-pointer hover:text-primary"
                                    />
                                  </div>
                                );
                              }
                            })
                          );
                        }
                      } else if (key === 'year') {
                        const { start_selected, end_selected, start } = obj;

                        if (start_selected >= start && end_selected >= start) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-x-1 border rounded-full p-1"
                            >
                              <h4 className="text-sm">
                                {start_selected} to {end_selected} Year
                              </h4>{' '}
                              <FaTimes
                                className="cursor-pointer hover:text-primary"
                                onClick={() => _hanleCloseYear(key)}
                              />
                            </div>
                          );
                        }
                      } else if (key === 'odometer') {
                        const { min, max, min_selected, max_selected } = obj;

                        if (min < max_selected) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-x-1 border rounded-full p-1"
                            >
                              <h4 className="text-sm">
                                {min_selected} to ${max_selected} Miles
                              </h4>{' '}
                              <FaTimes
                                onClick={() => _hanleCloseYear(key)}
                                className="cursor-pointer hover:text-primary"
                              />
                            </div>
                          );
                        }
                      } else if (key === 'sale_date') {
                        const { start_selected, end_selected } = obj;

                        if (start_selected && end_selected) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-x-1 border rounded-full p-1"
                            >
                              <h4 className="text-sm">
                                {start_selected} to {end_selected} Year
                              </h4>{' '}
                              <FaTimes
                                onClick={() => _hanleCloseYear(key)}
                                className="cursor-pointer hover:text-primary"
                              />
                            </div>
                          );
                        }
                      } else if (key === 'vin_lot') {
                        if (obj && obj.length > 0) {
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-x-1 border rounded-full p-1"
                            >
                              <h4 className="text-sm">{obj}</h4>{' '}
                              <FaTimes
                                onClick={() => _hanleCloseYear(key)}
                                className="cursor-pointer hover:text-primary"
                              />
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                  <hr className="my-1" />
                </div>

                <div className="flex items-center gap-3 mb-2 py-4">
                  <h4 className="text-sm font-bold ml-5">
                    Newly Added Vehicle
                  </h4>

                  <div>
                    <select
                      required
                      name="newlyAddedVehicle"
                      id="newlyAddedVehicle"
                      onChange={_handleChangeNewVehicle}
                      value={newlyAdded}
                      className="bg-white py-1.5 rounded-lg focus:border-0 focus:outline-none w-full max-h-[50px] overflow-y-auto shadow-light"
                    >
                      {filterData.newly_added_vehicle &&
                        filterData.newly_added_vehicle.map((e) => {
                          return (
                            <option value={e.key} key={e.key}>
                              {e.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div
                    className={`border w-10 h-5 rounded-full relative ${
                      newlySwiched ? 'bg-primary bg-opacity-65' : 'bg-gray-300'
                    }`}
                    onClick={() => _handleSubmitNewlyAdd()}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full duration-500 ${
                        newlySwiched
                          ? 'bg-white right-0.5'
                          : 'bg-white left-0.5'
                      }`}
                    ></div>
                  </div>
                </div>

                <div>
                  <Accordion
                    className="!border-0"
                    key={resultArr.length}
                    collapseAll
                  >
                    {resultArr.map((e) => {
                      return _MakeAccordionItem(e);
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-2">
              <div>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <h5 className="font-semibold text-lg">
                    We Found{' '}
                    <span className="font-bold text-primary text-xl">
                      {meta?.total}
                    </span>{' '}
                    cars available for you
                  </h5>
                  <div className="flex justify-center items-center gap-x-2">
                    <IoGrid
                      className={`hover:text-primary cursor-pointer ${
                        isGrid && 'text-primary'
                      }`}
                      size={20}
                      onClick={() => setIsGrid(true)}
                    />
                    <FaThList
                      className={`hover:text-primary cursor-pointer ${
                        !isGrid && 'text-primary'
                      }`}
                      size={20}
                      onClick={() => setIsGrid(false)}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <CarList
                    isGrid={isGrid}
                    lotData={lotData}
                    loading={loading}
                    token={token}
                  />
                </div>
                <Pagination meta={meta} handlePagination={_handlePangation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
