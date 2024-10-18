import React from 'react';

const Adduser = ({ name, setName, dob, setDob, idtype, setIdtype, idNum, setIdNum, idAddr, setIdAddr, idGender, setIdGender, handleAddUser }) => {
  return (
    <div className="mb-6 w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="DOB"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select ID Type</option>
        <option value={0}>Aadhar Card</option>
      </select>

      {idtype === 0 && ( // Only show these inputs if "Aadhar Card" is selected
        <>
          <input
            type="text"
            placeholder="ID Number"
            value={idNum}
            onChange={(e) => setIdNum(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={idAddr}
            onChange={(e) => setIdAddr(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Gender"
            value={idGender}
            onChange={(e) => setIdGender(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <button
        className="w-full cursor-pointer bg-green-500 hover:bg-green-600 transition text-white font-semibold px-5 py-3 rounded-lg"
        onClick={handleAddUser}
        disabled={idtype === null} // Disable button if idtype is not selected
      >
        Add User
      </button>
    </div>
  );
};

export default Adduser;
