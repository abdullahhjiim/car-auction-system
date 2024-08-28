export const customOptions = (options) => {
    const list = options?.map((i) => ({
      label: i?.name,
      value: i?.id,
    }));

    return list?.length > 0 ? list : [];
  };

export const customCustomerOption = (options) => {
    const list = options?.map((i) => ({
      label: i?.name,
      value: i?.user_id,
    }));

    return list?.length > 0 ? list : [];
  };


