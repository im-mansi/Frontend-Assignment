import React, { useState } from 'react';

const SwitchField = ({ field }) => {
  const [isChecked, setIsChecked] = useState(false);

  const labelStyle = {
    color: isChecked ? 'black' : 'red',
  };

  const asteriskStyle = {
    color: 'red',
    marginLeft: '4px',
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="mb-4 flex gap-8">
      <label className="block" style={labelStyle}>
        {field.label}
        <span style={asteriskStyle}>*</span>
      </label>
      <input type="checkbox" onChange={handleCheckboxChange} />
    </div>
  );
};

export default SwitchField;
