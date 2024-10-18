// Input.jsx
import React from 'react';

const Input = (props) => {
  const { type, placeholder, value, setValue } = props; // Notice the correct casing here
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)} // Correctly references setValue
      className="border p-2 mr-2"
    />
  );
};

export default Input;
