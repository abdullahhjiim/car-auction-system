const Select = ({
  label,
  selectedOption,
  options,
  htmlFor,
  selectValue,
  setSelectValue,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm text-primary font-medium"
      >
        {label}*
      </label>
      <select
        id={htmlFor}
        className="bg-gray-50 border border-gray-300 shadow-light text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option selected hidden>
          {selectedOption}
        </option>
        {options.map((option, i) => {
          return (
            <option value={option.value} key={i}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
