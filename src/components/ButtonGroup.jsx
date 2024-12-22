import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function ButtonGroup({
  label,
  options,
  name,
  setValue,
  getValues,
  error,
  labelClass,
  flat = false,
  optionClass,
}) {
  const [selectedValue, setSelectedValue] = useState(getValues(name));

  const handleButtonClick = (value) => {
    setValue(name, value);
    setSelectedValue(value);
  };
  useEffect(() => {
    setSelectedValue(getValues(name));
  }, [getValues, getValues(name), name]);
  return (
    <>
      <p className={`${labelClass}`}>{label}</p>
      <div className={`grid  ${flat ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleButtonClick(option)}
            className={` ${optionClass} ${
              selectedValue === option ? "bg-gray-200" : "bg-transparent"
            } p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 hover:bg-gray-200 transition-colors`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </>
  );
}

export default ButtonGroup;
