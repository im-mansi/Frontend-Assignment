// InputField.js
import React, { useState } from 'react';

const InputField = ({ field, isRequired, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="mb-4 flex">
      {field.label === 'Type' || field.label === 'Slices' ? null : (
        <label className={`block w-1/6 ${isRequired && inputValue == '' ? 'text-red-500' : 'text-[#36383c]'}`}>
          {field.label}
          {isRequired && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {field.label === 'Type' ? null : (
        <input
          type="text"
          placeholder={field.placeholder}
          className={`w-full p-2 border ${isRequired && inputValue == '' ? 'border-red-500' : inputValue ? 'border-gray-300' : 'border-gray-300 '} bg-[#f0f6fe] rounded-md`}
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default InputField;
