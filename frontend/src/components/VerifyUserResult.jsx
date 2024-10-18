// components/VerifyUserResult.js
import React from 'react';

const VerifyUserResult = ({ isVerified }) => {
  return (
    <div className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition duration-300 border border-blue-700">
      <h2 className="text-2xl font-extrabold mb-4 border-b-2 border-purple-300 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-yellow-300">
        User Verification Result
      </h2>
      <div className="text-lg flex flex-col gap-4">
        {isVerified ? (
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-100">✅ Status:</span>
            <span className="text-lg font-bold text-green-300">User Verified</span>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-100">❌ Status:</span>
            <span className="text-lg font-bold text-red-400">User Not Found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyUserResult;
