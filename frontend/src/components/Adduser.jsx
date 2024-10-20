import React, { useState } from 'react';

const Adduser = ({ name, setName, dob, setDob, idtype, setIdtype, idNum, setIdNum, idAddr, setIdAddr, idGender, setIdGender, handleAddUser }) => {
  const [idNumError, setIdNumError] = useState(''); // State to track ID Number error

  // Function to format date as 'YYYY-MM-DD' string
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle ID Number validation
  const handleIdNumChange = (e) => {
    const value = e.target.value;
    setIdNum(value);

    if (value.length < 12) {
      setIdNumError('ID Number must be at least 12 characters long');
    } else {
      setIdNumError(''); // Clear the error if length is valid
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (idNum.length < 12) {
      setIdNumError('ID Number must be at least 12 characters long');
    } else {
      handleAddUser(); // Proceed if no errors
    }
  };

  return (
    <div className="mb-6 w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
      />
      <input
        type="date"
        placeholder="DOB"
        value={dob ? formatDate(dob) : ''}
        onChange={(e) => {
          const selectedDate = e.target.value;
          setDob(selectedDate); // Save the date as a string in the format 'YYYY-MM-DD'
        }}
        className={`border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          dob ? 'text-black' : 'text-gray-400'
        }`} // Change text color depending on whether DOB is set
      />
      <select
        value={idtype === null ? '' : idtype} // If idtype is null, show an empty string to prompt selection
        onChange={(e) => {
          const value = e.target.value === '' ? null : parseInt(e.target.value);
          setIdtype(value);
          // Reset fields if ID type is deselected
          if (value === null) {
            setIdNum('');
            setIdAddr('');
            setIdGender('');
          }
        }}
        className={`border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          idtype === null ? 'text-gray-400' : 'text-black'
        }`} // Change color for placeholder (light shade) vs. selected value
      >
        <option value="" disabled>Select ID Type</option>
        <option value={0}>Aadhar Card</option>
        <option value={1}>Passport</option>
        <option value={2}>Driving License</option>
        <option value={3}>Voter ID</option>
        <option value={4}>PAN Card</option>
        <option value={5}>Employee ID</option>
      </select>

      {idtype !== null && ( // Only show these inputs if an ID type is selected
        <>
          <input
            type="text"
            placeholder="ID Number"
            value={idNum}
            onChange={handleIdNumChange}
            className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
              idNumError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500`}
          />
          {idNumError && <span className="text-red-500 text-sm">{idNumError}</span>} {/* Show error message */}
          <input
            type="text"
            placeholder="Address"
            value={idAddr}
            onChange={(e) => setIdAddr(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={idGender}
            onChange={(e) => setIdGender(e.target.value)} // Store gender as a string
            className={`border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !idGender ? 'text-gray-400' : 'text-black'
            }`}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </>
      )}

      <button
        className="w-full cursor-pointer bg-green-500 hover:bg-green-600 transition text-white font-semibold px-5 py-3 rounded-lg"
        onClick={handleSubmit} // Use custom submit handler
        disabled={idtype === null} // Disable button if idtype is not selected
      >
        Add User
      </button>
    </div>
  );
};

export default Adduser;
