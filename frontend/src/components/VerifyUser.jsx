import React from 'react'

const VerifyUser = ({name,setName,idNum,setIdNum,uid,setUid,handleVerifyUser}) => {
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
        type="number"
        placeholder="ID Number"
        value={idNum}
        onChange={(e) => setIdNum(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
        type="text"
        placeholder="UID (32-bit hash)"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between">
        <button
          className="w-full mr-2 cursor-pointer bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-5 py-3 rounded-lg"
          onClick={handleVerifyUser}
        >
          Verify User
        </button>
      </div>
    </div>
  )
}

export default VerifyUser
