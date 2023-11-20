import React, { useState } from 'react';

const SelectField = ({ field, isRequired, disabled, showAdvancedFields }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="mb-4 flex">
        {(field.label === 'Size' || field.label === 'Portion') && !showAdvancedFields ? null : (
          <label className={`block w-1/4 ${isRequired && !selectedValue ? 'text-red-500' : ''}`}>
            {field.label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        {(field.label === 'Size' || field.label === 'Portion') && !showAdvancedFields ? null : (
          <select
            className={`w-3/4 p-2 border ${
              isRequired && !selectedValue ? 'border-red-500' : selectedValue ? 'border-gray-300' : 'border-gray-300'
            } bg-[#f0f6fe] rounded-md`}
            disabled={disabled}
            onChange={handleChange}
          >
            {field.validate.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default SelectField;
