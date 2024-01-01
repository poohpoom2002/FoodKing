import React from 'react';
import './selectMode.css';
const SelectMode = (props) => {
  return (
    <div>
        <input
        type="checkbox"
        id="toggle"
        className="toggleCheckbox"
        onChange={props.handleCheckboxChange}
        />
        <label htmlFor="toggle" className="toggleContainer">
            <div>สั่งอาหาร</div> 
            <div>รับหิ้ว</div>
        </label>
    </div>
  );
};

export default SelectMode;