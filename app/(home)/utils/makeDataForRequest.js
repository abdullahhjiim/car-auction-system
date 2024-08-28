// Make Filter Data
export const makefilterData = (data) => {
  let responsObject = {};

  Object.keys(data).map((key) => {
    let obj = data[key];

    if (Array.isArray(obj) && obj.length > 0) {
      if (key !== "newly_added_vehicle") {
        const filterChecked = data[key].filter((item) => {
          if (item.checked) {
            return item;
          }
        });

        responsObject[key] = filterChecked;
      } else if (key === "newly_added_vehicle") {
        const filterChecked = data[key].filter((item) => {
          if (item.is_selected) {
            return item;
          }
        });

        responsObject[key] = filterChecked;
      }
    } else {
      if (key === "year") {
        const { start_selected, end_selected, start, end } = obj;

        if (start_selected >= start && end_selected >= start) {
          responsObject.year = { min: start_selected, max: end_selected };
        }
      } else if (key === "odometer") {
        const { min, max, min_selected, max_selected } = obj;

        if (min < max_selected) {
          responsObject.odometer = { min: min_selected, max: max_selected };
        }
      } else if (key === "sale_date") {
        const { end_selected, start_selected } = obj;

        if (end_selected && start_selected) {
          responsObject.sale_date = {
            ...obj,
          };
        }
      } else if (key === "vin_lot") {
          responsObject.vin_lot = obj;
      } else if (key === "order_by") {
          responsObject.order_by = obj;
      } else if (key === "order_by_column") {
        responsObject.order_by_column = obj;
      } else if (key === "start_bid_amount") {
        responsObject.start_bid_amount = obj;
      }
    }
  });

  return responsObject;
};

// Make Filter for showing Search Result
export const isSearchData = (filterData) => {
  const _filterDataObject = makefilterData(filterData);
  let result = false;

  Object.keys(_filterDataObject).map((key) => {
    let obj = _filterDataObject[key];

    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        result = true;
      }
    } else {
      if(obj && typeof obj === "object") {
        Object.keys(obj).map((k) => {
          result = true;
        });
      }else {
        if(obj && obj.length > 0) {
          result = true;
        }
      }
    }
  });

  return result;
};

// Make Params To Text
export const makeParamsToText = (searchParams) => {
  let result = "";

  Object.keys(searchParams).map((key) => {
    const isArray = Array.isArray(searchParams[key]);

    if (isArray) {
      if (key !== "newly_added_vehicle") {
        const sp = searchParams[key].map((e) => e.id);

        if (sp.length) {
          result += `${key}=${sp}&`;
        }
      } else if (key === "newly_added_vehicle") {
        if (searchParams[key].length > 0) {
          const sp = searchParams[key][0].key;
          result += `${key}=${sp}&`;
        }
      }
    } else if (key === "page" || key === "limit") {
      result += `${key}=${searchParams[key]}&`;
    } else if (key === "odometer" || key === "year") {
      const { min, max } = searchParams[key];
      result += `${key}=${min}-${max}&`;
    } else if (key === "sale_date") {
      const { start_selected, end_selected } = searchParams[key];
      result += `${key}=${start_selected}to${end_selected}&`;
    } else if (key === "vin_lot" || key === 'order_by' || key === 'order_by_column' || key === 'start_bid_amount') {
      if(searchParams[key] && searchParams[key].length > 0) {
        result += `${key}=${searchParams[key]}&`;
      }
    }
  });
  return result;
};

// Update Filter
export const updatefilterData = (filterData, item, key, searchData) => {
  let finalFilterData = searchData?.length > 0 ? searchData :  filterData[key];
  const _updatefilterData = finalFilterData.map((el) => {
    if (el.id === item.id) {
      if (el.checked) {
        return {
          ...el,
          checked: false,
        };
      } else {
        return {
          ...el,
          checked: true,
        };
      }
    } else {
      return el;
    }
  });

  return _updatefilterData;
};

export const makeDate = (e) => {
  const _date = new Date(e);
  const _getYear = _date.getFullYear();
  const _getMonth = _date.getMonth() + 1;
  const _getDate = _date.getDate();

  return `${_getYear}-${_getMonth}-${_getDate}`;
};
