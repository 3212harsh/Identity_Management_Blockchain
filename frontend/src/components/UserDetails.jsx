// components/UserDetails.js

const UserDetails = ({ userDetails }) => {
    return (
      <div className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-2xl shadow-2xl text-white transition-transform transform hover:scale-105 hover:shadow-3xl border-2 border-indigo-600">
        <h2 className="text-3xl font-extrabold mb-4 border-b-2 border-indigo-300 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-500">User Details</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">👤 Name:</p>
            <p className="text-lg font-medium">{userDetails[0]}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">📅 DOB:</p>
            <p className="text-lg font-medium">{userDetails[1]}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">🆔 ID Type:</p>
            <span className={`px-3 py-1 rounded-full bg-green-600 text-sm`}>
              {userDetails.idtype.toString() === '0' ? 'Aadhar Card' : 'Other'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">🔢 ID Number:</p>
            <p className="text-lg font-medium">{userDetails.aadharNum.toString()}</p> {/* Convert BigInt to String */}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">🏠 Address:</p>
            <p className="text-lg font-medium">{userDetails[4]}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100">⚧ Gender:</p>
            <p className="text-lg font-medium">{userDetails[5]}</p>
          </div>
        </div>
      </div>
    );
  };

export default UserDetails;
