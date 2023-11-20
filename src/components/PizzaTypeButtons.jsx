// PizzaTypeButtons.js

import React, { useState } from 'react';

const PizzaTypeButtons = ({ subParameters }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const renderSubParameters = (subParameters, level) =>
    subParameters.map((subParameter, index) => (
      <div key={index} className={`mb-4 ml-${level * 2} flex`}>
        <label className={`block w-1/6 ${subParameter.validate.required ? 'text-red-500' : ''}`}>
          {subParameter.label}
          {subParameter.validate.required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {renderField(subParameter, index, false)}
        {subParameter.subParameters && renderSubParameters(subParameter.subParameters, level + 1)}
      </div>
    ));

  const renderField = (field, index, disabled) => {
    const isRequired = field.validate && field.validate.required;

    switch (field.uiType) {
      case 'Input':
        return (
          <input
            key={index}
            type="text"
            placeholder={field.placeholder}
            className={`w-full p-2 border ${isRequired ? 'border-red-500' : 'border-gray-300 bg-[#f1f6ff'} rounded-md`}
            disabled={disabled}
          />
        );
      case 'Select':
        return (
          <select
            key={index}
            className={`w-full p-2 border ${isRequired ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            disabled={disabled}
          >
            {field.validate.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      // Add other cases as needed for different field types
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        {subParameters.map((option) => (
          <button
            key={option.value}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              selectedOption === option.value ? 'bg-gray-300' : ''
            }`}
            onClick={() => handleButtonClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedOption && renderSubParameters(subParameters.find((option) => option.value === selectedOption).subParameters, 1)}
    </div>
  );
};

export default PizzaTypeButtons;
