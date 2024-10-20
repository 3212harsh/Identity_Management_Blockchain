import { useEffect, useState } from "react";
import { init, addUser, verifyUser, displayUser } from './Contract/Web3client';
import Header from "./components/Header";
import Options from "./components/Options";
import Adduser from "./components/Adduser";
import VerifyUser from "./components/VerifyUser";
import DisplayUser from "./components/DisplayUser";
import UserDetails from "./components/UserDetails";
import VerifyUserResult from "./components/VerifyUserResult";
import AddUserResult from "./components/AddUserResult";

function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [idtype, setIdtype] = useState(null); 
  const [idNum, setIdNum] = useState("");
  const [idAddr, setIdAddr] = useState("");
  const [idGender, setIdGender] = useState("");
  const [uid, setUid] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [addUserResult, setAddUserResult] = useState("");

  useEffect(() => {
    init(); // Initialize web3 and contract on component mount
  }, []);

  // Add user function
  const handleAddUser = async () => {
    setAddUserResult(''); 
    try {
      setLoading(true); 
      const userHash = await addUser(name, dob, idtype, idNum, idAddr, idGender);
      setAddUserResult(`${userHash.events.UserAdded.returnValues.uid}`);
      setName('');
      setDob('');
      setIdNum('');
      setIdAddr('');
      setIdGender('');
      setIdtype(null); 
    } catch (error) {
      setAddUserResult("Error adding user: " + error.message);
    } finally {
      setLoading(false); 
    }
  };

  // Verify user function
  const handleVerifyUser = async () => {
    try {
      const isUserVerified = await verifyUser(name, uid, idNum);
      setIsVerified(isUserVerified);
      setName('');
      setIdNum('');
      setUid('');
    } catch (error) {
      setIsVerified(false);
      alert("Error verifying user: " + error.message);
    }
  };

  // Display user details function
  const handleDisplayUser = async () => {
    try {
      const details = await displayUser(uid);
      setUserDetails(details);
      setUid('');
    } catch (error) {
      alert("Error displaying user details: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* <Header /> */}
      <div className="p-10 w-2/3 lg:w-[40%] mt-[10vh] bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center border-2 border-gray-200">
        
        <Options 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption} 
          setUserDetails={setUserDetails} 
          setIsVerified={setIsVerified} 
          setAddUserResult={setAddUserResult} // Added this
          setLoading={setLoading}             // Added this
        />

        <h1 className="text-3xl font-extrabold text-gray-700 mb-6 tracking-wide">Identity Management</h1>

        {selectedOption === 1 && (
          <Adduser 
            name={name} 
            setName={setName} 
            dob={dob} 
            setDob={setDob} 
            idtype={idtype} 
            setIdtype={setIdtype} 
            idNum={idNum} 
            setIdNum={setIdNum} 
            idAddr={idAddr} 
            setIdAddr={setIdAddr} 
            idGender={idGender} 
            setIdGender={setIdGender} 
            handleAddUser={handleAddUser} 
          />
        )}
        {selectedOption === 2 && (
          <VerifyUser 
            name={name} 
            setName={setName} 
            idNum={idNum} 
            setIdNum={setIdNum} 
            uid={uid} 
            setUid={setUid} 
            handleVerifyUser={handleVerifyUser} 
          />
        )}
        {selectedOption === 3 && (
          <DisplayUser 
            uid={uid} 
            setUid={setUid} 
            handleDisplayUser={handleDisplayUser} 
          />
        )}

        {/* Add User Result */}
        {selectedOption === 1 && addUserResult && (
          <AddUserResult loading={loading} output={addUserResult} />
        )}

        {/* User Details card */}
        {selectedOption === 3 && userDetails && (
          <UserDetails userDetails={userDetails} />
        )}

        {/* Verification Result */}
        {selectedOption === 2 && isVerified !== null && (
          <VerifyUserResult isVerified={isVerified} />
        )}
      </div>
    </div>
  );
}

export default App;
