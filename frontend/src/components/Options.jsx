// Options.jsx
import React from 'react';

const Options = ({selectedOption, setSelectedOption, setOutput, setUserDetails, setIsVerified, setAddUserResult, setLoading}) => {
  const options = [
    { id: 1, label: 'Add User' },
    { id: 2, label: 'Verify User' },
    { id: 3, label: 'View Details' },
  ];

  const handleOptionClick = (id) => {
    // Only reset Add User result if switching away from 'Add User' (id === 1)
    if (selectedOption === 1 && id !== 1) {
      setAddUserResult('');  // Clear AddUserResult only when switching from 'Add User'
      setLoading(false);     // Stop loading when switching away from 'Add User'
    }

    // Always reset Verify User and View Details results when switching
    setSelectedOption(id);
    setOutput('');
    setUserDetails(null);
    setIsVerified(null);
  };

  return (
    <div className="w-full mb-10">
      <div className="flex justify-between gap-5 w-full text-blue-500 font-semibold text-xl">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`cursor-pointer p-2 rounded-lg transition w-full text-center duration-300 ${
              selectedOption === option.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-800'
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
