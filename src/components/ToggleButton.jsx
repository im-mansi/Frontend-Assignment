import React from 'react';

const ToggleButton = ({handleToggleChange ,isRightToLeft}) => {
  
//   const handleToggleChange = () => {
//   };

  const buttonStyle = {
    backgroundColor: isRightToLeft ? 'blue' : 'green',
    color: 'white',
    padding: '6px',
    borderRadius: '4px',
    marginLeft: isRightToLeft ? 'auto' : '0', // Set marginLeft to auto when toggled to right-to-left
    marginRight: isRightToLeft ? '0' : 'auto', // Set marginRight to auto when toggled to left-to-right
  };

  return (
    <div>
      <button onClick={handleToggleChange} style={buttonStyle}>
        {isRightToLeft ? 'Advance Option ←' : '→ Advance Option'}
      </button>
    </div>
  );
};

export default ToggleButton;
