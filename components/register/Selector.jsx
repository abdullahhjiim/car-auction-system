import { authAxios } from '/app/(home)/axious-config';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

const Selector = ({ placeholder, url, setValue }) => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    authAxios
      .get(url)
      .then((res) => {
        setCountries(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && 'text-gray-700'
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + '...'
            : selected
          : `Select ${placeholder}`}
        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul
        className={`absolute z-[111111] w-full top-[90%] bg-white mt-2 overflow-y-auto ${
          open ? 'max-h-60' : 'max-h-0'
        } `}
      >
        <div className="flex gap-2 items-center sticky top-0 px-2 bg-white mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={`Enter ${placeholder} name`}
            className="input-with-shadow w-full"
          />{' '}
          <AiOutlineSearch size={22} className="text-gray-700" />
        </div>

        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`p-3 text-sm hover:bg-primary hover:text-white cursor-pointer
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              'bg-primary text-white'
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? 'block'
                : 'hidden'
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue('');
                setValue(country?.id);
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
