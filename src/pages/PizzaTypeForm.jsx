import React, { useState } from 'react';

const PizzaTypeForm = ({ pizzaTypeData }) => {
  const [formData, setFormData] = useState({});

  const renderForm = (fields, level) => {
    return fields.map((field) => {
      const isGroup = field.uiType === 'Group';

      return (
        <div key={field.jsonKey} className={`mb-4 ${isGroup ? 'ml-4' : ''}`}>
          <label className={`block text-base font-semibold mb-2`}>{field.label}</label>
          {isGroup && field.subParameters && renderForm(field.subParameters, level + 1)}
          {!isGroup && renderField(field, level)}
        </div>
      );
    });
  };

  const renderField = (field, level) => {
    switch (field.uiType) {
      case 'Radio':
        return (
          <div key={field.jsonKey} className="mb-4">
            {field.validate.options.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  name={field.jsonKey}
                  checked={formData[field.jsonKey] === option.value}
                  onChange={(e) => handleInputChange(field.jsonKey, e.target.value)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'Select':
        return (
          <div key={field.jsonKey} className="mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData[field.jsonKey]}
              onChange={(e) => handleInputChange(field.jsonKey, e.target.value)}
            >
              {field.validate.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'Switch':
        return (
          <div key={field.jsonKey} className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={formData[field.jsonKey] || false}
                onChange={() => handleInputChange(field.jsonKey, !formData[field.jsonKey])}
              />
              <span className="ml-2 text-gray-700">{field.label}</span>
            </label>
          </div>
        );
      case 'Input':
        return (
          <div key={field.jsonKey} className="mb-4">
            <input
              type="text"
              placeholder={field.placeholder}
              className={`w-full p-2 border ${field.validate.required ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              value={formData[field.jsonKey] || ''}
              onChange={(e) => handleInputChange(field.jsonKey, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div className="w-2/3 p-8 bg-white shadow-md">
      {renderForm([pizzaTypeData], 0)}
      {/* Additional components or buttons can be added here */}
      <button className="bg-green-500 text-white px-6 py-3 rounded-md" onClick={() => console.log(formData)}>
        Submit
      </button>
    </div>
  );
};

// Usage
const pizzaTypeData = { /* Paste the provided JSON data here */ };
<PizzaTypeForm pizzaTypeData={pizzaTypeData} />;
