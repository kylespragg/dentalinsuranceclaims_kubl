// Dropdown.js
import React, { useState } from 'react';
import './dropdown.css'; // Import CSS if needed

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <select value={selectedOption} onChange={handleChange} className="dropdown-select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <div className="content">
        {selectedOption === 'option1' && <div>This is content for Option 1.</div>}
        {selectedOption === 'option2' && <div>This is content for Option 2.</div>}
        {selectedOption === 'option3' && <div>This is content for Option 3.</div>}
      </div>
    </div>
  );
};

export default Dropdown;
