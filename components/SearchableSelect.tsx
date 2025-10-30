import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ label, options, value, onChange, placeholder, id }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = query 
    ? options.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    onChange(option.value);
    setIsOpen(false);
  };
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        const matchingOption = options.find(opt => opt.value === value);
        setQuery(matchingOption ? matchingOption.label : '');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, value, options]);
  
  useEffect(() => {
    const matchingOption = options.find(opt => opt.value === value);
    setQuery(matchingOption ? matchingOption.label : '');
  }, [value, options]);

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={id || label} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        id={id || label}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(''); // Clear the actual value while typing
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredOptions.length > 0 ? filteredOptions.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="relative cursor-pointer select-none py-2 px-4 text-gray-900 dark:text-gray-200 hover:bg-primary-500 hover:text-white"
            >
              {option.label}
            </li>
          )) : (
            <li className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-400">
              No city found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;
