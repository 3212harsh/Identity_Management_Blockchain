import React from 'react'

const DisplayUser = ({uid, setUid, handleDisplayUser}) => {
  return (
    <div className="mb-4 w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="UID (32-bit hash)"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between">
        <button
          className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold px-5 py-3 rounded-lg"
          onClick={handleDisplayUser}
        >
          Display User
        </button>
      </div>
    </div>
  )
}

export default DisplayUser
