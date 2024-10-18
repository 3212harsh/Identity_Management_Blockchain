// components/AddUserResult.js
import React from 'react';

const AddUserResult = ({ loading, output }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(output)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy: ", err);
      });
  };

  return (
    <div className="mt-6 w-full bg-blue-700 p-6 rounded-xl shadow-lg text-white transition-transform transform hover:scale-105 duration-300 border border-blue-500">
      <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-purple-300 pb-2">
        Add User Status
      </h2>

      {loading ? (
        <div className="flex items-center justify-center flex-col">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          <p className="mt-4 text-lg font-semibold">Transaction in progress... Please wait.</p>
        </div>
      ) : output ? (
        <div className="text-lg overflow-auto max-h-60">
          <div className="mb-4 p-4 bg-blue-800 rounded-lg shadow-md border border-blue-600">
            <span className="font-semibold text-yellow-300">✅ Result:</span>
            <p className="mt-2 text-white break-words">{output}</p>
          </div>
          <button 
            onClick={handleCopyToClipboard} 
            className="mt-4 bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Copy Result
          </button>
        </div>
      ) : (
        <div className="text-lg text-gray-300">No transaction has been attempted yet.</div>
      )}
    </div>
  );
};

export default AddUserResult;
