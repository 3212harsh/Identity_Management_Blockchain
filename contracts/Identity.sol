// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

contract Identity {

    // enum IDtype {Aadhar, Passport, License}

    struct user {
        bytes32 uid;
        string name;
        string dob;
        uint idtype;
    }

    struct aadhar {
        uint number;
        string addres;
        string gender;
    }

    event UserAdded(bytes32 indexed uid);

    mapping (bytes32 => user) users;
    mapping (bytes32 => aadhar) useraadhar;

    modifier Basicdetails(string memory a, string memory b) {
        require(bytes(a).length > 0 && bytes(b).length > 0, "All fields must be non-empty");
        _;
    }

    // Function to add a new user
    function addUser(
        string memory _name,
        string memory _dob, 
        uint _idtype, 
        uint idNum, 
        string memory idaddr,
        string memory idgender
    ) public Basicdetails(_name, _dob) returns (bytes32) {
        // Generate a unique hash for the user using their details
        bytes32 inputHash = keccak256(abi.encodePacked(_name, _dob, _idtype));
        // Store the user details in the users mapping
        users[inputHash] = user(inputHash, _name, _dob, _idtype);

        // If the user ID type is Aadhar (idtype == 0), store Aadhar details in the useraadhar mapping
        if (_idtype == 0) {
            useraadhar[inputHash] = aadhar(idNum, idaddr, idgender);
        }
        emit UserAdded(inputHash);
        return inputHash;
    }

    // Function to verify if a user exists based on their details
    function verifyUser(
        string memory _name, 
        bytes32 _uid, 
        uint _idNum
    ) public view returns (bool) {
        // Check if the user with the provided uid exists
        if (users[_uid].uid == _uid) {
            // Further verify if the name matches
            if (keccak256(abi.encodePacked(users[_uid].name)) == keccak256(abi.encodePacked(_name))) {
                // If idtype is Aadhar (idtype == 0), match the Aadhar number
                if (users[_uid].idtype == 0 && useraadhar[_uid].number == _idNum) {
                    return true; // User exists
                }
            }
        }
        return false; // User does not exist or details don't match
    }

    // Function to display user details based on their unique hash
    function display(bytes32 hash) public view returns (
        string memory name, 
        string memory dob, 
        uint idtype, 
        uint aadharNum, 
        string memory aadharAddr, 
        string memory aadharGender
    ) {
        // Ensure the user exists before displaying their details
        require(users[hash].uid == hash, "User does not exist");

        // Retrieve user details from the mappings
        user memory usr = users[hash];
        aadhar memory adharDetails = useraadhar[hash];

        // If the user's ID type is Aadhar (idtype == 0), return their Aadhar details
        if (usr.idtype == 0) {
            return (usr.name, usr.dob, usr.idtype, adharDetails.number, adharDetails.addres, adharDetails.gender);
        } else {
            // If the user has another ID type, return default empty values for Aadhar fields
            return (usr.name, usr.dob, usr.idtype, 0, "", "");
        }
    }
}
