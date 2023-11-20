// SliceOptionsField.js
import React, { useState } from 'react';

const SliceOptionsField = ({ field, isRequired }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="mb-4 flex">
      <label className={`block w-1/6 ${isRequired && !selectedValue ? 'text-red-500' : ''}`}>
        {field.label}
        {isRequired && <span className="ml-1 text-red-500">*</span>}
      </label>
      <select
        className={`w-full p-2 border ${isRequired && !selectedValue ? 'border-red-500' : selectedValue ? 'border-gray-300' : 'border-gray-300'} rounded-md bg-[#f1f6ff]`}
        onChange={handleChange}
      >
        {field.validate.options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SliceOptionsField;
