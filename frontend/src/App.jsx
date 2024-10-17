import { useEffect, useState } from "react";
import { init, addUser, verifyUser, displayUser } from './Contract/Web3client';

function App() {
  // State variables to hold form input and contract outputs
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [idtype, setIdtype] = useState(0);
  const [idNum, setIdNum] = useState("");
  const [idAddr, setIdAddr] = useState("");
  const [idGender, setIdGender] = useState("");
  const [uid, setUid] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    init(); // Initialize web3 and contract on component mount
  }, []);

  // Add user function
  const handleAddUser = async () => {
    try {
      const userHash = await addUser(name, dob, idtype, idNum, idAddr, idGender).then((res)=>{return res});
      setOutput(`User added with UID: ${userHash.events.UserAdded.returnValues.uid}`);
    } catch (error) {
      setOutput("Error adding user: " + error.message);
    }
  };

  // Verify user function
  const handleVerifyUser = async () => {
    try {
      const isVerified = await verifyUser(name, uid, idNum);
      setOutput(`User verification result: ${isVerified ? "User exists" : "User does not exist"}`);
    } catch (error) {
      setOutput("Error verifying user: " + error.message);
    }
  };

  // Display user details function
  const handleDisplayUser = async () => {
    try {
      const userDetails = await displayUser(uid);
      setOutput(`User Details: Name: ${userDetails[0]}, DOB: ${userDetails[1]}, ID Type: ${userDetails[2]}, Aadhar Number: ${userDetails[3]}, Address: ${userDetails[4]}, Gender: ${userDetails[5]}`);
    } catch (error) {
      setOutput("Error displaying user details: " + error.message);
    }
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-xl mb-4">Identity Management</h1>

        {/* Input fields for adding a user */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="ID Type (0: Aadhar)"
            value={idtype}
            onChange={(e) => setIdtype(parseInt(e.target.value))}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="ID Number"
            value={idNum}
            onChange={(e) => setIdNum(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={idAddr}
            onChange={(e) => setIdAddr(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Gender"
            value={idGender}
            onChange={(e) => setIdGender(e.target.value)}
            className="border p-2 mr-2"
          />
          <button 
            className="cursor-pointer bg-green-500 text-white px-5 py-2"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>

        {/* Input fields for verifying and displaying a user */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="UID (32-bit hash)"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="border p-2 mr-2"
          />
          <button 
            className="cursor-pointer bg-blue-500 text-white px-5 py-2 mr-2"
            onClick={handleVerifyUser}
          >
            Verify User
          </button>
          <button 
            className="cursor-pointer bg-yellow-500 text-white px-5 py-2"
            onClick={handleDisplayUser}
          >
            Display User
          </button>
        </div>

        {/* Output display */}
        <div className="mt-4">
          <h2 className="text-lg">Output:</h2>
          <p>{output}</p>
        </div>
      </div>
    </>
  );
}

export default App;
