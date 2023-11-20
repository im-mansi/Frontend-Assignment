// SeasoningCheckbox.js
import React from 'react';

const SeasoningCheckbox = ({ field }) => (
  <div className="mb-4">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
      <span className="ml-2 text-gray-700">{field.label}</span>
    </label>
  </div>
);

export default SeasoningCheckbox;
